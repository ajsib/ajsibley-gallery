import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import { getBlobServiceClient } from '@/utils/blobServiceClient';
import Media from '@/models/Media';
import { connectToDatabase } from '@/utils/mongoose';

const handler = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const { mediaId } = req.query;

    // Fetch the media record
    const media = await Media.findById(mediaId).populate('gallery').lean();
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Check user permissions
    const userId = req.user.userId;

    // Assuming you have a way to check if the user is a member of the gallery
    const isOwner = media.gallery.owner.toString() === userId;
    const isMember = media.gallery.members.includes(userId);

    if (!isOwner && !isMember) {
      return res.status(403).json({ error: 'Unauthorized to access this media' });
    }

    // Get the blob client
    const containerName = 'photogallery';
    const blobServiceClient = getBlobServiceClient();
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobPath = `gallery-${media.gallery._id}/${media.fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobPath);

    // Download the blob
    const downloadBlockBlobResponse = await blockBlobClient.download();

    // Set appropriate headers
    res.setHeader('Content-Type', media.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${media.fileName}"`);

    // Stream the blob to the response
    const stream = downloadBlockBlobResponse.readableStreamBody;
    stream.pipe(res);
  } catch (error) {
    console.error('Error serving media:', error);
    res.status(500).json({ error: 'Failed to serve media' });
  }
};

export default validateToken(handler);
