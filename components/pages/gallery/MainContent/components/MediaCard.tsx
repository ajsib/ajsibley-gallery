/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react'; // Import React's functional component type
import { Media } from '@/components/types';

interface MediaCardProps {
  media: Media; // Ensure the `media` prop matches the `Media` interface
}

const MediaCard: FC<MediaCardProps> = ({ media }) => {
  const cardStyle = css`
    border: 1px solid var(--color-border);
    border-radius: 2px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
    position: relative;

    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;

  const thumbnailStyle = css`
    width: 100%;
    height: 150px;
    background-size: cover;
    background-position: center;
    background-image: url(${media.url});
  `;

  const contentStyle = css`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  `;

  const titleStyle = css`
    font-size: 16px;
    font-weight: bold;
    color: var(--color-text);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const handleCardClick = () => {
    // Implement logic to open media in a modal or new page
    console.log('Media clicked:', media.fileName);
  };

  return (
    <div css={cardStyle} onClick={handleCardClick}>
      <div css={thumbnailStyle}></div>
      <div css={contentStyle}>
        <h3 css={titleStyle}>{media.fileName}</h3>
      </div>
    </div>
  );
};

export default MediaCard;
