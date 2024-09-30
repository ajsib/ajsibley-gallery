import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

console.log('AZURE_STORAGE_ACCOUNT_NAME:', accountName);
console.log('AZURE_STORAGE_ACCOUNT_KEY:', accountKey ? 'Key is set' : 'Key is missing');

let blobServiceClient;

try {
  const credentials = new StorageSharedKeyCredential(accountName, accountKey);
  blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credentials
  );
  console.log('BlobServiceClient initialized successfully');
} catch (error) {
  console.error('Error initializing BlobServiceClient:', error);
}

export default blobServiceClient;
