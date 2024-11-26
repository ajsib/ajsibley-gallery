import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Media from '@/models/Media';
import { connectToDatabase } from '@/utils/mongoose';
import blobServiceClient from '@/utils/blobServiceClient';
import multer from 'multer';
import sharp from 'sharp';

// Multer setup for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Function to sanitize file names
const sanitizeFileName = (fileName) => {
  // Remove any characters that are not letters, numbers, dashes, underscores, or dots
  return fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
};

const handler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const galleryId = req.query.id;

    if (!galleryId) {
      return res.status(400).json({ error: 'Gallery ID is required' });
    }

    // Handle Multer file upload
    await new Promise((resolve, reject) => {
      upload.array('files')(req, {}, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedMedia = [];
    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    for (const file of files) {
      try {
        const sanitizedFileName = sanitizeFileName(file.originalname);
        const thumbnailFileName = `${sanitizedFileName.split('.').slice(0, -1).join('.')}-thumbnail.jpeg`;
        const filePath = `gallery-${galleryId}/${sanitizedFileName}`;
        const thumbnailPath = `gallery-${galleryId}/thumbnails/${thumbnailFileName}`;

        // Generate a thumbnail using Sharp
        const thumbnailBuffer = await sharp(file.buffer)
          .resize(300, 200, { fit: 'cover' })
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toBuffer();

        // Upload the original file to Azure Blob Storage
        const blockBlobClient = containerClient.getBlockBlobClient(filePath);
        await blockBlobClient.uploadData(file.buffer, {
          blobHTTPHeaders: { blobContentType: file.mimetype },
        });

        // Upload the thumbnail to Azure Blob Storage
        const thumbnailBlobClient = containerClient.getBlockBlobClient(thumbnailPath);
        await thumbnailBlobClient.uploadData(thumbnailBuffer, {
          blobHTTPHeaders: { blobContentType: 'image/jpeg' },
        });

        // Create a reference for the uploaded file in the database
        const media = new Media({
          gallery: galleryId,
          fileName: sanitizedFileName,
          mimeType: file.mimetype,
          size: file.size,
          url: blockBlobClient.url,
          uploadedBy: req.user.userId,
        });

        await media.save();

        uploadedMedia.push(media);
      } catch (error) {
        console.error(`Error processing file: ${file.originalname}`, error);
        return res.status(500).json({ error: 'Error processing files' });
      }
    }

    res.status(200).json(uploadedMedia);
  } catch (error) {
    console.error(`[POST] Error uploading files for gallery ID ${req.query.id}:`, error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
};

// Disable body parsing for Multer
export const config = {
  api: {
    bodyParser: false,
  },
};

export default validateToken(handler);
