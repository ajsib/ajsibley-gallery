/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MediaCard from './MediaCard';
import { useGalleryContext } from '../GalleryContext';

const MediaList = () => {
  const { media } = useGalleryContext();

  const mediaListStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  `;

  if (media.length === 0) {
    return <div>No media files found.</div>;
  }

  return (
    <div css={mediaListStyle}>
      {media.map((item) => (
        <MediaCard key={item._id} media={item} />
      ))}
    </div>
  );
};

export default MediaList;
