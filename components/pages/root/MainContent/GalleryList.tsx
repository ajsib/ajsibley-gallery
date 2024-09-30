/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GalleryCard from './GalleryCard';
import { Key } from 'react';

interface GalleryListProps {
  activeTab: 'your-galleries' | 'all-galleries' | 'shared-galleries';
}

const GalleryList = ({ activeTab }: GalleryListProps) => {
  const galleries = {
    'your-galleries': [
      { id: '1', name: 'Vacation Photos', description: 'Summer vacation trip to Spain.', thumbnail: '/images/vacation.jpg', owner: 'John Doe' },
      { id: '2', name: 'Family Rfsdfsdfadsfadfasdfsdfasdfasdfasdeunion', description: 'Reunion with all tsdfsdfsdfsdfsdfsfsdfsdfshe cousins and family.', thumbnail: '/images/family.jpg', owner: 'John Doe' },
    ],
    'all-galleries': [
      { id: '3', name: 'Nature Photography', description: 'Collection of nature photos.', thumbnail: '/images/nature.jpg', owner: 'Jane Smith' },
      { id: '4', name: 'Cityscapes', description: 'Stunning views of cities at night.', thumbnail: '/images/city.jpg', owner: 'Mike Johnson' },
    ],
    'shared-galleries': [
      { id: '5', name: 'Wedding Memories', description: 'Photos from the wedding ceremony.', thumbnail: '/images/wedding.jpg', owner: 'Emily Davis' },
      { id: '6', name: 'Birthday Party', description: 'Celebrating the best birthday ever.', thumbnail: '/images/birthday.jpg', owner: 'John Doe' },
    ],
  };

  const galleryListStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  `;

  const galleriesToShow = galleries[activeTab as 'your-galleries' | 'all-galleries' | 'shared-galleries'];

  return (
    <div css={galleryListStyle}>
      {galleriesToShow.map((gallery: { id: Key | null | undefined; name: string; description: string | undefined; thumbnail: string; owner: string; }) => (
        <GalleryCard 
          key={gallery.id} 
          name={gallery.name}
          description={gallery.description}
          thumbnail={gallery.thumbnail}
          ownerName={gallery.owner}
        />
      ))}
    </div>
  );
};

export default GalleryList;
