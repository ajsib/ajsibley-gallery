/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: SerializedStyles; // Optional custom styles
}

const SecondaryButton = ({ children, onClick, disabled = false, customStyle }: SecondaryButtonProps) => {
  const buttonStyle = css`
    padding: 12px 24px;
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary); /* Hollow button style */
    font-size: 16px;
    cursor: pointer;
    font-family: inherit;
    border-radius: 2px; /* Slightly rounded corners */
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    min-width: 180px;
    text-align: center;

    &:hover {
      background-color: var(--color-primary);
      color: #ffffff;
      border-color: var(--color-primary);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `;

  return (
    <button css={[buttonStyle, customStyle]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default SecondaryButton;
