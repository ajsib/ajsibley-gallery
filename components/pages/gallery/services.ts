import Cookies from 'js-cookie';
import { Media } from "@/components/types"

/**
 * Interface for the upload URL response.
 */
interface UploadUrlResponse {
  uploadUrl: string;
  media: Media;
}

/**
 * Generate a signed upload URL and create media reference.
 */
const getUploadUrl = async (
  galleryId: string,
  fileName: string,
  mimeType: string,
  size: number
): Promise<UploadUrlResponse> => {
  const response = await fetch(`/api/galleries/${galleryId}/upload-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token') || ''}`,
    },
    body: JSON.stringify({ fileName, mimeType, size }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get upload URL');
  }

  const data: UploadUrlResponse = await response.json();
  return data;
};

/**
 * Upload a file directly to Azure Blob Storage.
 */
const uploadFileDirectly = async (uploadUrl: string, file: File): Promise<void> => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'x-ms-blob-type': 'BlockBlob' },
    body: file,
  });

  if (!response.ok) {
    throw new Error('Failed to upload file directly');
  }
};

/**
 * Interface for gallery file.
 */
interface GalleryResponse {
  gallery: {
    name: string;
    description: string;
  };
  media: Media[];
}

/**
 * Fetch gallery files.
 */
const getGalleryFiles = async (
  galleryId: string,
  page = 1,
  limit = 10
): Promise<GalleryResponse> => {
  const response = await fetch(`/api/galleries/${galleryId}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('token') || ''}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch gallery files');
  }

  const data: GalleryResponse = await response.json();
  return data;
};

export { getGalleryFiles, getUploadUrl, uploadFileDirectly };
