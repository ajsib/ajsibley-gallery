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

    const { id, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    console.log(`[GET] Fetching media for gallery ID: ${id}`);

    const gallery = await Gallery.findById(id).lean();
    if (!gallery) {
      return res.status(404).json({ error: 'Gallery not found' });
    }

    const media = await Media.find({ gallery: id })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalMediaCount = await Media.countDocuments({ gallery: id });

    // Generate SAS URLs for each media file
    const containerName = 'photogallery';
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const mediaWithUrls = await Promise.all(
      media.map(async (file) => {
        const blockBlobClient = containerClient.getBlockBlobClient(`gallery-${id}/${file.fileName}`);
        const sasUrl = await blockBlobClient.generateSasUrl({
          permissions: 'r', // Read-only permissions
          expiresOn: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes expiry
        });
        return { ...file, url: sasUrl };
      })
    );

    res.status(200).json({
      gallery: {
        name: gallery.name,
        description: gallery.description,
      },
      media: mediaWithUrls,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalMediaCount / Number(limit)),
        hasMore: skip + media.length < totalMediaCount,
      },
    });
  } catch (error) {
    console.error(`[GET] Error fetching gallery files:`, error);
    res.status(500).json({ error: 'Failed to fetch gallery files' });
  }
};

export default validateToken(handler);
