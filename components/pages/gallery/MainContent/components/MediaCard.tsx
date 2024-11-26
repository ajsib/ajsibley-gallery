/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Image from 'next/image'; // Import Next.js Image
import { Media } from '@/components/types';

interface MediaCardProps {
  media: Media & { thumbnail: string | null };
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

  const thumbnailContainerStyle = css`
    width: 100%;
    height: 150px;
    position: relative; /* Required for Next.js Image layout="fill" */
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
    console.log('Media clicked:', media.fileName);
  };

  return (
    <div css={cardStyle} onClick={handleCardClick}>
      <div css={thumbnailContainerStyle}>
        <Image
          src={media.thumbnail ? `data:image/jpeg;base64,${media.thumbnail}` : '/placeholder-thumbnail.jpg'}
          alt={media.fileName}
          layout="fill" // Covers the container
          objectFit="cover" // Ensures the image fills the container proportionally
          priority // Optimized for above-the-fold content
        />
      </div>
      <div css={contentStyle}>
        <h3 css={titleStyle}>{media.fileName}</h3>
      </div>
    </div>
  );
};

export default MediaCard;
