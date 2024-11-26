/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import MediaList from './components/MediaList';
import UploadFileButton from './components/UploadFileButton';
import SearchBar from './components/SearchBar';
import MediaFilter from './components/MediaFilter';
import { useGalleryContext } from './GalleryContext';

interface MainContentProps {
  galleryId: string;
}

const MainContent = ({ galleryId }: MainContentProps) => {
  const { fetchGalleryFiles } = useGalleryContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        await fetchGalleryFiles(galleryId);
      } catch (error) {
        console.error('Error loading media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [galleryId]);

  const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  `;

  return (
    <div css={containerStyle}>
      <div css={css`display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;`}>
        <SearchBar />
        <UploadFileButton galleryId={galleryId} />
      </div>
      <MediaFilter />
      {loading ? <div>Loading...</div> : <MediaList />}
    </div>
  );
};

export default MainContent;
