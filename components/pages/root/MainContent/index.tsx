/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GalleryList from './GalleryList';
import CreateGalleryButton from './CreateGalleryButton';
import GalleryToggle from './GalleryToggle';
import SearchBar from './SearchBar';
import { useState } from 'react';

const MainContent = () => {
  const [activeTab, setActiveTab] = useState<'your-galleries' | 'all-galleries' | 'shared-galleries'>('all-galleries');

  const mainContentStyle = css`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  `;

  const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;

  const titleStyle = css`
    font-size: 28px;
    font-weight: bold;
    margin: 0;
  `;

  const searchAndButtonContainer = css`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  `;

  const searchBarContainer = css`
    width: 66%; /* 2/3 of the row */
  `;

  const buttonContainer = css`
    width: 33%; /* 1/3 of the row */
    display: flex;
    justify-content: flex-end;
  `;

  return (
    <div css={mainContentStyle}>
      <div css={headerStyle}>
        <h2 css={titleStyle}>
          {activeTab === 'all-galleries' && 'All Galleries'}
          {activeTab === 'your-galleries' && 'Your Galleries'}
          {activeTab === 'shared-galleries' && 'Shared Galleries'}
        </h2>
        <GalleryToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div css={searchAndButtonContainer}>
        <div css={searchBarContainer}>
          <SearchBar />
        </div>
        <div css={buttonContainer}>
          <CreateGalleryButton />
        </div>
      </div>
      <GalleryList activeTab={activeTab} />
    </div>
  );
};

export default MainContent;
