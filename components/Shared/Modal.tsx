/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent scroll without causing a layout shift (works well for modern browsers)
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden'; // Disable scroll
      return () => {
        document.body.style.overflow = originalStyle; // Restore on close
      };
    }
  }, [isOpen]);

  const modalOverlayStyle = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Dark overlay */
    display: ${isOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const modalContentStyle = css`
    background: #fff;
    border-radius: 2px; /* Updated border radius */
    width: 90%;
    max-width: 600px;
    max-height: 80%;
    overflow-y: auto; /* Scrollable content if it overflows */
    padding: 20px;
    position: relative;

    @media (max-width: 600px) {
      width: 95%;
      max-height: 85%;
    }
  `;

  const closeButtonStyle = css`
    position: absolute;
    top: 5px;
    right: 20px;
    width: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: var(--color-primary);
  `;

  if (!isOpen) {
    return null;
  }

  return (
    <div css={modalOverlayStyle} onClick={onClose}>
      <div
        css={modalContentStyle}
        onClick={(e) => e.stopPropagation()} /* Prevent closing modal on click inside */
      >
        <div css={closeButtonStyle} onClick={onClose}>
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
