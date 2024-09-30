/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import { useHeaderContext } from './HeaderContext';

interface SideMenuProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
  logout: () => void;
}

const SideMenu = ({ user, logout }: SideMenuProps) => {
  const { headerHeight } = useHeaderContext();

  const sideMenuStyles = css`
    position: fixed;
    top: ${headerHeight}px;
    left: 0;
    width: 250px;
    height: calc(100% - ${headerHeight}px);
    background-color: var(--color-component-bg);
    border-right: 1px solid var(--color-border);
    padding: 16px;
    box-sizing: border-box;
    overflow-y: auto;
    z-index: 999;
    transition: top 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  const linkStyles = css`
    display: block;
    color: var(--color-text);
    margin: 12px 0;
    font-size: 16px;
    text-decoration: none;

    &:hover {
      color: var(--color-primary);
      text-decoration: underline;
    }
  `;

  const separatorStyles = css`
    border-bottom: 1px solid var(--color-border);
    margin: 16px 0;
  `;

  const profileStyles = css`
    display: flex;
    align-items: center;
    margin-bottom: 16px;

    .user-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary);
      color: #fff;
      font-weight: bold;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      margin-right: 12px;
      font-size: 24px;
    }

    .user-info {
      display: flex;
      flex-direction: column;

      .username {
        font-weight: bold;
        color: var(--color-text);
      }

      .email {
        font-size: 14px;
        color: var(--color-muted);
      }
    }
  `;

  const logoutButtonStyles = css`
    padding: 12px;
    background-color: transparent;
    border: none;
    color: var(--color-primary);
    font-size: 16px;
    text-align: left;
    cursor: pointer;

    &:hover {
      background-color: var(--color-hover-bg);
    }
  `;

  return (
    <div css={sideMenuStyles}>
      <div>
        {user && (
          <>
            <div css={profileStyles}>
              <div className="user-initial">{user.username.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <div className="username">{user.username}</div>
                <div className="email">{user.email}</div>
              </div>
            </div>
            <div css={separatorStyles}></div>
          </>
        )}
        <div>
          <Link href="/my-story" css={linkStyles}>
            My Story
          </Link>
          <Link href="/projects" css={linkStyles}>
            Projects
          </Link>
          <Link href="/resume" css={linkStyles}>
            Resume
          </Link>
          <Link href="/contact" css={linkStyles}>
            Contact
          </Link>
        </div>
      </div>
      {user && (
        <button css={logoutButtonStyles} onClick={logout}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default SideMenu;
