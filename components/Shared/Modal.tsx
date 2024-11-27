/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  maxWidth?: string;
  maxHeight?: string;
}

const Modal = ({ children, isOpen, onClose, maxWidth = '600px', maxHeight = '80%' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const modalOverlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Use a semi-transparent overlay */
    display: ${isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContentWrapperStyle = css`
    position: relative;
    background: var(--color-component-bg); /* Adaptive component background */
    color: var(--color-text); /* Adaptive text color */
    width: 90%;
    max-width: ${maxWidth};
    max-height: ${maxHeight};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--color-border); /* Add a border matching the theme */

    @media (max-width: 600px) {
      width: 95%;
      max-height: 85%;
    }
  `;

  const closeButtonWrapperStyle = css`
    position: absolute;
    top: -10px;
    right: 0;
    z-index: 10;
  `;

  const closeButtonStyle = css`
    background: none;
    border: none;
    font-size: 24px;
    font-weight: bold;
    color: var(--color-muted); /* Use muted color for close button */
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      background: none; /* Prevent background highlight */
      color: var(--color-hover-primary); /* Theme hover color */
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary); /* Show outline in theme color */
      outline-offset: 4px; /* Add space between the outline and the button */
    }

    &:focus {
      outline: none; /* Prevent default browser focus styles */
    }
  `;

  const modalChildrenStyle = css`
    flex: 1; /* Ensures children fill the modal while leaving space for the close button */
    position: relative;
    overflow: auto;
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <div css={modalOverlayStyle} onClick={onClose}>
      <div
        css={modalContentWrapperStyle}
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to overlay
      >
        <div css={closeButtonWrapperStyle}>
          <button css={closeButtonStyle} onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        </div>
        <div css={modalChildrenStyle}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
