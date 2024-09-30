/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const ProfileIcon = ({ size = '24px', color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="16"
  >
    <circle cx="128" cy="96" r="64" />
    <path d="M32,216c19.37-33.47,54.55-56,96-56s76.63,22.53,96,56" />
  </svg>
);

export default ProfileIcon;
