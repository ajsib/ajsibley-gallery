import multer from 'multer';  // To handle file uploads
import { getSession } from 'next-auth/react';
import Gallery from '@/models/Gallery';
import Media from '@/models/Media';
import blobServiceClient from '@/utils/blobServiceClient';  // Azure Blob Storage Client
import { connectToDatabase } from '@/utils/mongoose';

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  await connectToDatabase();

  const gallery = await Gallery.findById(id);
  if (!gallery || !gallery.members.includes(session.user.id)) {
    return res.status(403).json({ error: 'You do not have access to this gallery' });
  }

  // Use multer to process the file upload
  upload.array('files')(req, {}, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'File upload error' });
    }

    const files = req.files;

    const uploadPromises = files.map(async (file) => {
      // Create a unique blob name and upload to Azure
      const containerClient = blobServiceClient.getContainerClient('galleries');
      const blockBlobClient = containerClient.getBlockBlobClient(`${gallery._id}/${file.originalname}`);

      await blockBlobClient.uploadData(file.buffer);

      // Save the media metadata in MongoDB
      const media = new Media({
        fileName: file.originalname,
        url: blockBlobClient.url,
        mimeType: file.mimetype,
        size: file.size,
        gallery: gallery._id,
        uploadedBy: session.user.id,
      });

      await media.save();
    });

    await Promise.all(uploadPromises);

    return res.status(200).json({ message: 'Files uploaded successfully' });
  });
}
