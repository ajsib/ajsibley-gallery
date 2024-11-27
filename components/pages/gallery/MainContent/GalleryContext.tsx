import React, { createContext, useContext, useState } from 'react';
import { getGalleryFiles } from '../services';
import { Media } from '@/components/types';

interface GalleryContextType {
  media: Media[];
  galleryName: string;
  galleryDescription: string;
  fetchGalleryFiles: (galleryId: string) => Promise<void>;
  appendMedia: (newMedia: Media, galleryId: string) => void;
  hasMore: boolean;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGalleryContext = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
};

interface GalleryProviderProps {
  children: React.ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [galleryName, setGalleryName] = useState<string>('');
  const [galleryDescription, setGalleryDescription] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true); // Initialize state

  const fetchGalleryFiles = async (galleryId: string, page = 1, limit = 25, reset = false) => {
    try {
      const data = await getGalleryFiles(galleryId, page, limit);
      setMedia((prev) => (reset ? data.media : [...prev, ...data.media]));
      setGalleryName(data.gallery.name);
      setGalleryDescription(data.gallery.description);
      setHasMore(data.pagination.hasMore);
    } catch (error) {
      console.error('Error fetching gallery files:', error);
    }
  };

  const appendMedia = (newMedia: Media, galleryId: string) => {
    const mediaWithThumbnail = {
      ...newMedia,
      thumbnail: `/api/galleries/${galleryId}/media/${newMedia.fileName}?thumbnail=true`,
    };
    setMedia((prevMedia) => [mediaWithThumbnail, ...prevMedia]);
  };

  return (
    <GalleryContext.Provider
      value={{
        media,
        galleryName,
        galleryDescription,
        fetchGalleryFiles,
        appendMedia,
        hasMore, // Pass hasMore to the context
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

