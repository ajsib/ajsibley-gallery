/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Image from 'next/image';
import { Media } from '@/components/types';

interface MediaCardProps {
  media: Media & { thumbnail: string | null };
  onClick: () => void;
}

const MediaCard: FC<MediaCardProps> = ({ media, onClick }) => {
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
    position: relative;
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

  return (
    <div css={cardStyle} onClick={onClick}>
      <div css={thumbnailContainerStyle}>
        <Image
          src={media.thumbnail ? `data:image/jpeg;base64,${media.thumbnail}` : '/placeholder-thumbnail.jpg'}
          alt={media.fileName}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div css={contentStyle}>
        <h3 css={titleStyle}>{media.fileName}</h3>
      </div>
    </div>
  );
};

export default MediaCard;
