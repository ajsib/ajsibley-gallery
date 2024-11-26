import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from '@azure/storage-blob';
import blobServiceClient from '@/utils/blobServiceClient';
import Gallery from '@/models/Gallery';
import Media from '@/models/Media';
import { connectToDatabase } from '@/utils/mongoose';

const handler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const { id } = req.query;
    const { fileName, mimeType, size } = req.body;

    console.log(`[POST] Generating upload URL for file: ${fileName}`);

    // Validate gallery
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Handle duplicate file names
    let uniqueFileName = fileName;
    let counter = 1;

    while (await Media.exists({ gallery: id, fileName: uniqueFileName })) {
      const nameParts = fileName.split('.');
      const extension = nameParts.length > 1 ? `.${nameParts.pop()}` : '';
      const baseName = nameParts.join('.');
      uniqueFileName = `${baseName}-${counter}${extension}`;
      counter++;
    }

    const blobPath = `gallery-${id}/${uniqueFileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

    // Generate SAS token for uploading
    const sharedKeyCredential = new StorageSharedKeyCredential(
      process.env.AZURE_STORAGE_ACCOUNT_NAME,
      process.env.AZURE_STORAGE_ACCOUNT_KEY
    );

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName: blobPath,
        permissions: BlobSASPermissions.parse('cw'), // Create and write permissions
        expiresOn: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
      sharedKeyCredential
    ).toString();

    const sasUrl = `${blockBlobClient.url}?${sasToken}`;

    // Save reference to MongoDB
    const newMedia = new Media({
      fileName: uniqueFileName,
      url: blockBlobClient.url,
      mimeType,
      size,
      gallery: id,
      uploadedBy: req.user.userId, // Ensure user authentication adds user ID
    });
    await newMedia.save();

    console.log(`[POST] Generated SAS URL and saved media reference.`);

    res.status(200).json({ uploadUrl: sasUrl, media: newMedia });
  } catch (error) {
    console.error(`[POST] Error generating upload URL:`, error);
    res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};

export default validateToken(handler);
