import blobServiceClient from '@/utils/blobServiceClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      console.log('GET request received');
      const containerName = 'photogallery';
      console.log('Using container name:', containerName);

      const containerClient = blobServiceClient.getContainerClient(containerName);
      console.log('ContainerClient initialized successfully');

      const blobs = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        console.log('Blob found:', blob.name);
        blobs.push({
          name: blob.name,
          url: containerClient.getBlobClient(blob.name).url,
        });
      }
      
      console.log('Total blobs fetched:', blobs.length);
      res.status(200).json({ blobs });
    } catch (error) {
      console.error('Error fetching blobs:', error);
      res.status(500).json({ error: 'Failed to fetch blobs', details: error.message });
    }
  } else {
    console.log('Method not allowed:', req.method);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
