/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const MediaFilter = () => {
  const containerStyle = css`
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 20px;
  `;

  const filterOptionStyle = css`
    cursor: pointer;
    font-weight: normal;
    color: var(--color-secondary);
    transition: color 0.2s ease;
    white-space: nowrap;

    &:hover {
      color: var(--color-primary);
    }
  `;

  const handleFilterClick = (filter: string) => {
    console.log('Filter clicked:', filter);
    // Implement filter logic here
  };

  return (
    <div css={containerStyle}>
      <div css={filterOptionStyle} onClick={() => handleFilterClick('All')}>
        All
      </div>
      <div css={filterOptionStyle} onClick={() => handleFilterClick('Images')}>
        Images
      </div>
      <div css={filterOptionStyle} onClick={() => handleFilterClick('Videos')}>
        Videos
      </div>
    </div>
  );
};

export default MediaFilter;
