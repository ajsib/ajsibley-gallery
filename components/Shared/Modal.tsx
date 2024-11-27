/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

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
    background: rgba(0, 0, 0, 0.5);
    display: ${isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContentWrapperStyle = css`
    position: relative;
    background: #fff;
    width: 90%;
    max-width: ${maxWidth};
    max-height: ${maxHeight};
    overflow: hidden;
    display: flex;
    flex-direction: column;

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
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    background: none; /* Prevent background highlight */
    color: #000; /* Slightly darken text color on hover for feedback */
  }

  &:focus-visible {
    outline: 2px solid #555; /* Show outline only when focused via keyboard */
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

  return ReactDOM.createPortal(
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
    </div>,
    document.body
  );
};

export default Modal;
