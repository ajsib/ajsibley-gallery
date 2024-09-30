/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';

interface HamburgerIconProps {
  isOpen?: boolean; // External control for the toggle state
  primaryColor?: string;
  secondaryColor?: string;
  size?: string;
  onToggle?: (isOpen: boolean) => void; // Callback for external state management
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  isOpen: isOpenProp = false,
  primaryColor = 'currentColor',
  secondaryColor = 'currentColor',
  size = '24px',
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const iconStyles = css`
    width: ${size};
    height: ${size};
    display: inline-block;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  `;

  const handleClick = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState); // Call external handler if provided
    }
  };

  return (
    <div css={iconStyles} onClick={handleClick}>
      {isOpen ? (
        // "X" icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="200"
            y1="56"
            x2="56"
            y2="200"
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="200"
            y1="200"
            x2="56"
            y2="56"
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      ) : (
        // Hamburger icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none" />
          <line
            x1="40"
            y1="64"
            x2="216"
            y2="64"
            fill="none"
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="40"
            y1="128"
            x2="216"
            y2="128"
            fill="none"
            stroke={secondaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
          <line
            x1="40"
            y1="192"
            x2="216"
            y2="192"
            fill="none"
            stroke={primaryColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
      )}
    </div>
  );
};

export default HamburgerIcon;
