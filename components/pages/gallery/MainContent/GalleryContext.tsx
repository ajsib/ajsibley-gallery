import React, { createContext, useContext, useState } from 'react';
import { getGalleryFiles } from '../services';
import { Media } from '@/components/types'

interface GalleryContextType {
  media: Media[];
  fetchGalleryFiles: (galleryId: string) => Promise<void>;
  appendMedia: (newMedia: Media) => void;
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

  const fetchGalleryFiles = async (galleryId: string) => {
    try {
      const data = await getGalleryFiles(galleryId);
      setMedia(data.media); // Ensure media is consistent with `Media[]`
    } catch (error) {
      console.error('Error fetching gallery files:', error);
    }
  };

  const appendMedia = (newMedia: Media) => {
    setMedia((prevMedia) => [newMedia, ...prevMedia]); // Add the new media at the start
  };

  return (
    <GalleryContext.Provider value={{ media, fetchGalleryFiles, appendMedia }}>
      {children}
    </GalleryContext.Provider>
  );
};
