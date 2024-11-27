// /api/galleries/[id]/media/[mediaId].js

import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Gallery from '@/models/Gallery';
import Media from '@/models/Media'; // Ensure Media schema is defined in your models
import { connectToDatabase } from '@/utils/mongoose';
import blobServiceClient from '@/utils/blobServiceClient';

const handler = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Cache-Control', 'no-store'); // No caching for invalid methods
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const { id, mediaId, thumbnail } = req.query;
    const user = req.user;

    if (!id || !mediaId) {
      res.setHeader('Cache-Control', 'no-store'); // No caching for bad requests
      return res.status(400).json({ error: 'Gallery ID and media ID are required' });
    }

    // Fetch the gallery and validate access
    const gallery = await Gallery.findById(id).lean();
    if (!gallery) {
      res.setHeader('Cache-Control', 'no-store'); // No caching for non-existent galleries
      return res.status(404).json({ error: 'Gallery not found' });
    }

    const isAuthorized =
      user &&
      (gallery.owner.userId.toString() === user.userId.toString() ||
        gallery.members.some((memberId) => memberId.toString() === user.userId.toString()));

    if (!isAuthorized) {
      res.setHeader('Cache-Control', 'no-store'); // No caching for unauthorized users
      return res.status(403).json({ error: 'You do not have permission to view this gallery' });
    }

    // Fetch the media file by ID
    const media = await Media.findById(mediaId).lean();
    if (!media) {
      res.setHeader('Cache-Control', 'no-store'); // No caching for missing media
      return res.status(404).json({ error: 'Media not found' });
    }

    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const filePath = thumbnail === 'true'
      ? `gallery-${id}/thumbnails/${media.fileName.split('.').slice(0, -1).join('.')}-thumbnail.jpeg`
      : `gallery-${id}/${media.fileName}`;

    const blobClient = containerClient.getBlobClient(filePath);

    if (!(await blobClient.exists())) {
      res.setHeader('Cache-Control', 'no-store'); // No caching for missing files
      return res.status(404).json({ error: 'File not found' });
    }

    const blobDownloadResponse = await blobClient.download();

    // Set Cache-Control headers to ensure privacy
    res.setHeader('Cache-Control', 'private, max-age=31536000, immutable'); // Cache only for this user
    res.setHeader('Vary', 'Cookie'); // Ensure user-specific caching
    res.setHeader('Content-Type', blobDownloadResponse.contentType || 'application/octet-stream');
    res.setHeader('Content-Length', blobDownloadResponse.contentLength);
    blobDownloadResponse.readableStreamBody.pipe(res);
  } catch (error) {
    console.error(`[GET] Error streaming media ${req.query.mediaId} for gallery ID ${req.query.id}:`, error);
    res.status(500).json({ error: 'Failed to stream file' });
  }
};

export default validateToken(handler);
