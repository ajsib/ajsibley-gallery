import Cookies from 'js-cookie';
import { Media } from "@/components/types"

/**
 * Upload files and generate thumbnails.
 */
const uploadFiles = async (galleryId: string, files: File[]): Promise<Media[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('files', file));

  const response = await fetch(`/api/galleries/${galleryId}/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${Cookies.get('token') || ''}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to upload files');
  }

  return response.json();
};

/**
 * Interface for gallery file. 
 */
// Define the GalleryResponse interface
interface GalleryResponse {
  gallery: {
    name: string; // Name of the gallery
    description: string; // Description of the gallery
  };
  media: MediaWithThumbnails[]; // Array of media with thumbnails
  pagination: {
    currentPage: number; // Current page number
    totalPages: number; // Total number of pages available
    hasMore: boolean; // Indicates if there are more pages to fetch
  };
}

interface MediaWithThumbnails extends Media {
  thumbnailUrl: string;
}

/**
 * Fetch gallery files.
 */
const getGalleryFiles = async (
  galleryId: string,
  page = 1,
  limit = 10
): Promise<GalleryResponse> => {
  console.log(`[LOG] Service Function Triggered getGalleryFiles - Page: ${page}`);
  const response = await fetch(`/api/galleries/${galleryId}/paginatedFetch?page=${page}&limit=${limit}`, {
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


export { getGalleryFiles, uploadFiles };
