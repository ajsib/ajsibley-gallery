import { getSession } from 'next-auth/react';
import Media from '@/models/Media';
import Gallery from '@/models/Gallery';
import { connectToDatabase } from '@/utils/mongoose';
import blobServiceClient from '@/utils/blobServiceClient';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  await connectToDatabase();

  const media = await Media.findById(id).populate('gallery');
  if (!media) {
    return res.status(404).json({ error: 'Media not found' });
  }

  const gallery = media.gallery;
  if (!gallery.members.includes(session.user.id)) {
    return res.status(403).json({ error: 'You do not have access to this media' });
  }

  try {
    // Delete the file from Azure Blob Storage
    const containerClient = blobServiceClient.getContainerClient('galleries');
    const blockBlobClient = containerClient.getBlockBlobClient(`${gallery._id}/${media.fileName}`);
    await blockBlobClient.delete();

    // Delete the media metadata from MongoDB
    await media.deleteOne();

    return res.status(200).json({ message: 'Media deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete media' });
  }
}
