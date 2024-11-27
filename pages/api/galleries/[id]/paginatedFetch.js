import { validateToken } from '@/utils/authentication/tokenValidationMiddleware';
import Gallery from '@/models/Gallery';
import Media from '@/models/Media';
import { connectToDatabase } from '@/utils/mongoose';
import blobServiceClient from '@/utils/blobServiceClient';

const handler = async (req, res) => {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    await connectToDatabase();

    const { id, page = 1, limit = 25 } = req.query;
    const user = req.user;

    if (!id) {
      return res.status(400).json({ error: 'Gallery ID is required' });
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

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch media files associated with the gallery
    const media = await Media.find({ gallery: id })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalMediaCount = await Media.countDocuments({ gallery: id });

    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Fetch thumbnail data in a single request
    const mediaWithThumbnails = await Promise.all(
      media.map(async (file) => {
        const thumbnailBlobPath = `gallery-${id}/thumbnails/${file.fileName.split('.').slice(0, -1).join('.')}-thumbnail.jpeg`;
        const thumbnailBlobClient = containerClient.getBlobClient(thumbnailBlobPath);

        let thumbnailBuffer;
        if (await thumbnailBlobClient.exists()) {
          const downloadResponse = await thumbnailBlobClient.download();
          thumbnailBuffer = await streamToBuffer(downloadResponse.readableStreamBody);
        }

        return {
          ...file,
          thumbnail: thumbnailBuffer ? thumbnailBuffer.toString('base64') : null, // Base64 encode thumbnail
        };
      })
    );

    res.status(200).json({
      gallery: {
        name: gallery.name,
        description: gallery.description,
      },
      media: mediaWithThumbnails,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalMediaCount / Number(limit)),
        hasMore: skip + media.length < totalMediaCount,
      },
    });
  } catch (error) {
    console.error(`[GET] Error fetching media for gallery ID: ${req.query.id}`, error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
};

// Helper function to convert a readable stream to a buffer
const streamToBuffer = async (readableStream) => {
  const chunks = [];
  for await (const chunk of readableStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

export default validateToken(handler);
