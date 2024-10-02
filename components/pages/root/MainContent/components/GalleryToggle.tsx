/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface GalleryToggleProps {
  activeTab: 'your-galleries' | 'all-galleries' | 'shared-galleries'; // Constrain to valid tab names
  setActiveTab: (tab: 'your-galleries' | 'all-galleries' | 'shared-galleries') => void; // Correct typing for setActiveTab
}

const GalleryToggle = ({ activeTab, setActiveTab }: GalleryToggleProps) => {
  const containerStyle = css`
    display: flex;
    justify-content: flex-end; /* Align the tabs to the right */
    gap: 20px;
  `;

  const tabStyle = (isActive: boolean) => css`
    padding: 10px 20px;
    cursor: pointer;
    font-weight: ${isActive ? 'bold' : 'normal'};
    border-bottom: 2px solid transparent;
    border-color: ${isActive ? 'var(--color-primary)' : 'transparent'};
    color: ${isActive ? 'var(--color-primary)' : 'var(--color-secondary)'};
    transition: color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap; /* Prevent tabs from wrapping */
  `;

  return (
    <div css={containerStyle}>
      <div
        css={tabStyle(activeTab === 'all-galleries')}
        onClick={() => setActiveTab('all-galleries')}
      >
        All Galleries
      </div>
      <div
        css={tabStyle(activeTab === 'your-galleries')}
        onClick={() => setActiveTab('your-galleries')}
      >
        Your Galleries
      </div>
      <div
        css={tabStyle(activeTab === 'shared-galleries')}
        onClick={() => setActiveTab('shared-galleries')}
      >
        Shared Galleries
      </div>
    </div>
  );
};

export default GalleryToggle;
