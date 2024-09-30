// pages/api/blob/uploadBlob.js
import blobServiceClient from '@/utils/blobServiceClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const containerName = 'photogallery';
      const containerClient = blobServiceClient.getContainerClient(containerName);
      await containerClient.createIfNotExists();

      const { fileName, file } = req.body;
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      const data = Buffer.from(file, 'base64'); // Assuming the file is sent in base64 format
      await blockBlobClient.upload(data, data.length);

      res.status(200).json({ url: blockBlobClient.url });
    } catch {
      res.status(500).json({ error: 'Failed to upload blob' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
