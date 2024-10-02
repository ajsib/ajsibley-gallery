/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import GalleryCard from './GalleryCard';
import { useGalleryContext } from '../GalleryContext'; // Import the custom hook from context

interface GalleryListProps {
  activeTab: 'your-galleries' | 'all-galleries' | 'shared-galleries';
}

const GalleryList = ({ activeTab }: GalleryListProps) => {
  const { galleries, fetchGalleries } = useGalleryContext(); // Use the context hook to get gallery data and fetch function
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch galleries on component mount
  useEffect(() => {
    const loadGalleries = async () => {
      try {
        await fetchGalleries(); // Fetch galleries from the service
      } catch (error) {
        console.error('Error loading galleries:', error);
      } finally {
        setLoading(false); // Stop loading once fetch is complete
      }
    };

    loadGalleries();
  }, []); // Run on mount

  // Filter galleries based on activeTab
  const getFilteredGalleries = () => {
    if (activeTab === 'your-galleries') {
      return galleries.filter(gallery => gallery.shared === false); // Replace with actual user ID logic
    } else if (activeTab === 'shared-galleries') {
      return galleries.filter(gallery => gallery.shared === true); // Assuming shared is a boolean field
    }
    return galleries; // For 'all-galleries', return all
  };

  const filteredGalleries = getFilteredGalleries();

  const galleryListStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  `;

  if (loading) {
    return <div>Loading...</div>; // Show loading state until galleries are fetched
  }

  return (
    <div css={galleryListStyle} key={galleries.length}>
      {filteredGalleries.map((gallery) => (
        <GalleryCard 
          key={gallery._id.toString()} 
          name={gallery.name}
          description={gallery.description}
          thumbnail={gallery.thumbnail}
          ownerName={gallery.owner.username}
        />
      ))}
    </div>
  );
};

export default GalleryList;
