/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface ImageModalProps {
  galleryId: string;
  fileName: string;
}

const modalContentStyle = css`
  background-color: #fff;
  padding: 0; /* Remove padding to maximize image space */
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
`;

const imageWrapperStyle = css`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const titleStyle = css`
  padding: 10px;
  text-align: center;
  background-color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #ccc;
`;

const loadingStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #888;
`;

const ImageModal: FC<ImageModalProps> = ({ galleryId, fileName }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update the URL when the modal is opened
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, file: fileName },
      },
      undefined,
      { shallow: true }
    );

    // Cleanup function to remove the query param when modal is closed
    return () => {
      const { ...rest } = router.query;
      router.push(
        {
          pathname: router.pathname,
          query: { ...rest },
        },
        undefined,
        { shallow: true }
      );
    };
  }, [fileName]);

  const imageSrc = `/api/galleries/${galleryId}/media/${fileName}`;

  const customLoader = ({ src }: { src: string }) => src;

  return (
      <div css={modalContentStyle}>
        <div css={imageWrapperStyle}>
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
        <div css={titleStyle}>{fileName}</div>
      </div>
  );
};

export default ImageModal;
