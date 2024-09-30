// pages/api/blob/deleteBlob.js
import blobServiceClient from '@/utils/blobServiceClient';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      const containerName = 'photogallery';
      const { fileName } = req.body;
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      await blockBlobClient.delete();

      res.status(200).json({ message: 'Blob deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete blob' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
