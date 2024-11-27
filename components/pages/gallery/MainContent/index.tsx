/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SearchBar from './components/SearchBar';
import MediaFilter from './components/MediaFilter';
import UploadFileButton from './components/UploadFileButton';
import MediaList from './components/MediaList';

interface MainContentProps {
  galleryId: string;
}

const MainContent = ({ galleryId }: MainContentProps) => {
  const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  `;

  return (
    <div css={containerStyle}>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        `}
      >
        <SearchBar />
        <UploadFileButton galleryId={galleryId} />
      </div>
      <MediaFilter />
      <MediaList galleryId={galleryId} />
    </div>
  );
};

export default MainContent;
