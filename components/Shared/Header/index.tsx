/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/UI/icons/logo';
import Hamburger from '@/components/UI/icons/hamburger';
import ProfileIcon from '@/components/UI/icons/profile';
import SideMenu from './SideMenu';

const paddingVertical = 10;
const paddingHorizontal = 18;
const logoMargin = 18;
const fontSizeBase = 18;
const headerHeight = 60;

interface HeaderProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
  logout: () => void;
}

const Header = ({ user, logout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${headerHeight}px;
    padding: ${paddingVertical}px ${paddingHorizontal}px;
    background-color: ${isAtTop ? 'transparent' : 'var(--color-component-bg)'};
    border-bottom: ${isAtTop ? 'none' : '1px solid var(--color-border)'};
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
    transition: background-color 0.2s, border-bottom 0.2s;
    color: ${isAtTop ? 'white' : 'var(--color-text)'};
  `;

  const leftContainerStyles = css`
    display: flex;
    align-items: center;
  `;

  const logoContainerStyles = css`
    display: flex;
    align-items: center;
    height: 100%;

    svg {
      height: ${fontSizeBase * 2}px;
      width: auto;
      margin: 0 ${logoMargin}px;
      fill: ${isAtTop ? 'white' : 'var(--color-primary)'};
    }

    h1 {
      font-size: ${fontSizeBase * 1.75}px;
      color: ${isAtTop ? 'white' : 'var(--color-primary)'};
      margin: 0;
    }
  `;

  const hamburgerStyles = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: ${logoMargin}px;
  `;

  const navStyles = css`
    display: flex;
    align-items: center;
  `;

  const linksContainerStyles = css`
    display: flex;
    align-items: center;

    @media (max-width: 1000px) {
      display: none;
    }

    a {
      margin-left: ${paddingHorizontal}px;
      font-size: ${fontSizeBase}px;
      font-weight: 600;
      color: ${isAtTop ? 'white' : 'var(--color-secondary)'};

      &:hover,
      &:focus {
        color: ${isAtTop ? '#f0f0f0' : 'var(--color-primary)'};
        text-decoration: underline;
      }
    }
  `;

  const profileContainerStyles = css`
    display: flex;
    align-items: center;
    margin-left: ${paddingHorizontal}px;

    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 24px;
      background-color: ${isAtTop ? 'white' : 'var(--color-text)'};
      margin-right: ${paddingHorizontal}px;
    }

    button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background-color: transparent;
      cursor: pointer;
      font-size: ${fontSizeBase}px;
      color: ${isAtTop ? 'white' : 'var(--color-primary)'};
      border: none;

      &:hover {
        background-color: ${isAtTop ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-hover-bg)'};
      }

      svg {
        margin-right: 6px;
        fill: ${isAtTop ? 'white' : 'var(--color-primary)'};
      }
    }
  `;

  return (
    <>
      <header css={headerStyles}>
        <div css={leftContainerStyles}>
          <div css={hamburgerStyles} onClick={toggleMenu}>
            {/* Conditionally pass color prop */}
            <Hamburger isOpen={isMenuOpen} size="28px" color={isAtTop ? 'white' : 'var(--color-primary)'} />
          </div>
          <div css={logoContainerStyles}>
            <Logo color={isAtTop ? 'white' : 'var(--color-primary)'} />
            <h1>AJSibley Galleries</h1>
          </div>
        </div>
        <nav css={navStyles}>
          <div css={linksContainerStyles}>
            <Link href="/my-story">My Story</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/resume">Resume</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div css={profileContainerStyles}>
            {user ? (
              <>
                <button onClick={logout}>
                  <ProfileIcon size="20px" />
                  Log Out
                </button>
              </>
            ) : (
              <Link href="/login">
                <button>
                  <ProfileIcon size="20px" />
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>
      {isMenuOpen && <SideMenu user={user} logout={logout} />}
    </>
  );
};

export default Header;
