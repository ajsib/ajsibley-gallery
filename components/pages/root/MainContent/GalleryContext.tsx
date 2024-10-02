import React, { createContext, useState, useContext } from 'react';
import { getGalleries } from '@/components/pages/root/services';
import { Gallery } from '@/components/types'; // Import the Gallery type

interface GalleryContextProps {
  galleries: Gallery[]; // Use Gallery[] instead of any[]
  fetchGalleries: () => Promise<void>;
  appendGallery: (newGallery: Gallery) => void; // Use Gallery instead of any
}

const GalleryContext = createContext<GalleryContextProps | undefined>(undefined);

export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGalleryContext must be used within a GalleryProvider');
  }
  return context;
};

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]); // Use Gallery[] instead of any[]

  const fetchGalleries = async () => {
    try {
      const galleriesFromService = await getGalleries();
      setGalleries(galleriesFromService);
    } catch (error) {
      console.error('Failed to fetch galleries from service:', error);
      throw error;
    }
  };

  const appendGallery = (newGallery: Gallery) => { // Use Gallery instead of any
    setGalleries((prevGalleries) => [newGallery, ...prevGalleries]);
  };

  return (
    <GalleryContext.Provider value={{ galleries, fetchGalleries, appendGallery }}>
      {children}
    </GalleryContext.Provider>
  );
};
