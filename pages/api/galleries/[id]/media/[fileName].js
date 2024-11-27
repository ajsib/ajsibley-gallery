import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Gallery from '@/models/Gallery';
import { connectToDatabase } from '@/utils/mongoose';
import blobServiceClient from '@/utils/blobServiceClient';

const handler = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const { id, fileName, thumbnail } = req.query;
    const user = req.user;

    if (!id || !fileName) {
      return res.status(400).json({ error: 'Gallery ID and file name are required' });
    }

    // Fetch the gallery and validate access
    const gallery = await Gallery.findById(id).lean();
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    const isAuthorized =
      gallery.owner.userId.toString() === user.userId.toString() ||
      gallery.members.some((memberId) => memberId.toString() === user.userId.toString());

    if (!isAuthorized) {
      return res.status(403).json({ error: 'You do not have permission to view this gallery' });
    }

    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const filePath = thumbnail === 'true'
      ? `gallery-${id}/thumbnails/${fileName.split('.').slice(0, -1).join('.')}-thumbnail.jpeg`
      : `gallery-${id}/${fileName}`;

    const blobClient = containerClient.getBlobClient(filePath);

    if (!(await blobClient.exists())) {
      return res.status(404).json({ error: 'File not found' });
    }

    const blobDownloadResponse = await blobClient.download();

    // Set Cache-Control headers
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache for 1 year
    res.setHeader('Content-Type', blobDownloadResponse.contentType || 'application/octet-stream');
    res.setHeader('Content-Length', blobDownloadResponse.contentLength);
    blobDownloadResponse.readableStreamBody.pipe(res);
  } catch (error) {
    console.error(`[GET] Error streaming file ${req.query.fileName} for gallery ID ${req.query.id}:`, error);
    res.status(500).json({ error: 'Failed to stream file' });
  }
};

export default validateToken(handler);
