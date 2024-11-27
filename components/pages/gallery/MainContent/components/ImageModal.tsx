/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useState } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  galleryId: string;
  mediaId: string;
  fileName: string;
}

const modalContentStyle = css`
  background-color: var(--color-background);
  padding: 0;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const imageWrapperStyle = (isVisible: boolean) => css`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: ${isVisible ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`;

const titleStyle = css`
  padding: 10px;
  text-align: center;
  background-color: var(--color-component-bg);
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
`;

const loadingStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: var(--color-muted);
`;

const ImageModal: FC<ImageModalProps> = ({ galleryId, mediaId, fileName }) => {
  const [isLoading, setIsLoading] = useState(true);

  const imageSrc = `/api/galleries/${galleryId}/media/${mediaId}`;

  const customLoader = ({ src }: { src: string }) => src;

  return (
    <div css={modalContentStyle}>
      <div css={titleStyle}>{fileName}</div>
      <div css={imageWrapperStyle(!isLoading)}>
        {isLoading && <div css={loadingStyle}>Loading image...</div>}
        <Image
          loader={customLoader}
          src={imageSrc}
          alt={fileName}
          layout="fill"
          objectFit="contain"
          onLoadingComplete={() => setIsLoading(false)}
          priority
        />
      </div>
    </div>
  );
};

export default ImageModal;
