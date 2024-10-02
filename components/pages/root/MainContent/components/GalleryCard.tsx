/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

interface GalleryCardProps {
  name: string;
  description?: string;
  thumbnail?: string | "";
  ownerName: string;
}

const maxTitleLength = 30;
const maxDescriptionLength = 100;

const GalleryCard = ({ name, description, thumbnail, ownerName }: GalleryCardProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
    background-image: url(${thumbnail});
  `;

  const contentStyle = css`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  `;

  const titleStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: var(--color-text);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const descriptionStyle = css`
    font-size: 14px;
    color: var(--color-muted);
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const ownerStyle = css`
    font-size: 12px;
    color: var(--color-secondary);
    margin-top: auto;
  `;

  const menuButtonStyle = css`
    position: absolute;
    top: 10px;
    right: 20px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    user-select: none; /* Prevents text selection */
  `;

  const menuButtonOverlayStyle = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    z-index: 1;
  `;

  const dropdownMenuStyle = css`
    position: absolute;
    top: 35px;
    right: 10px;
    background: var(--color-component-bg);
    border: 1px solid var(--color-border);
    border-radius: 2px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: ${isMenuOpen ? 'block' : 'none'};
    margin-top: 8px;
  `;

  const menuItemStyle = css`
    padding: 8px;
    font-size: 14px;
    color: var(--color-text);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-hover-background);
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid var(--color-border);
    }
  `;

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`${action} clicked`);
    setMenuOpen(false);
  };

  return (
    <div css={cardStyle}>
      <div css={thumbnailStyle}></div>
      <div css={contentStyle}>
        <h3 css={titleStyle}>{name.length > maxTitleLength ? name.substring(0, maxTitleLength) + '...' : name}</h3>
        {description && <p css={descriptionStyle}>{description.length > maxDescriptionLength ? description.substring(0, maxDescriptionLength) + '...' : description}</p>}
        <span css={ownerStyle}>Owned by {ownerName}</span>
      </div>
      {/* Menu Button with overlay to prevent text selection */}
      <div css={menuButtonStyle} onClick={handleMenuToggle}>
        &#x2026;
        <div css={menuButtonOverlayStyle}></div> {/* Transparent overlay to block text selection */}
      </div>

      {/* Dropdown Menu */}
      <div css={dropdownMenuStyle}>
        <div css={menuItemStyle} onClick={() => handleMenuItemClick('Share')}>Share</div>
        <div css={menuItemStyle} onClick={() => handleMenuItemClick('Add Member')}>Add Member</div>
        <div css={menuItemStyle} onClick={() => handleMenuItemClick('Delete')}>Delete</div>
      </div>
    </div>
  );
};

export default GalleryCard;
