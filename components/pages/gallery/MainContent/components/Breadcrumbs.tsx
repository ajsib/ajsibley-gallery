/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useGalleryContext } from '../GalleryContext';

const Breadcrumbs = () => {
  const { galleryName } = useGalleryContext();

  const containerStyle = css`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--color-muted);
    margin-bottom: 20px;
    gap: 8px;
  `;

  const linkStyle = css`
    color: var(--color-link);
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: var(--color-hover-link);
    }
  `;

  const separatorStyle = css`
    color: var(--color-muted);
  `;

  const currentStyle = css`
    font-weight: bold;
    color: var(--color-text);
  `;

  return (
    <nav css={containerStyle} aria-label="Breadcrumb">
      <Link href="/" css={linkStyle}>
        All Galleries
      </Link>
      <span css={separatorStyle}>/</span>
      {galleryName ? (
        <span css={currentStyle}>{galleryName}</span>
      ) : (
        <span css={currentStyle}>Gallery</span>
      )}
    </nav>
  );
};

export default Breadcrumbs;
