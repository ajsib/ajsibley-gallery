/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/UI/icons/logo';
import Hamburger from '@/components/UI/icons/hamburger';
import ProfileIcon from '@/components/UI/icons/profile';
import SideMenu from './SideMenu';
import { useHeaderContext } from './HeaderContext';

const paddingVertical = 10;
const paddingHorizontal = 18;
const logoMargin = 18;
const fontSizeBase = 18;

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
  const { isScrolled, headerHeight } = useHeaderContext();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Dynamic styles based on scroll position
  const headerStyles = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: ${headerHeight}px;
    padding: ${paddingVertical}px ${paddingHorizontal}px;
    background-color: ${isScrolled ? 'var(--color-component-bg)' : 'transparent'};
    border-bottom: ${isScrolled ? '1px solid var(--color-border)' : 'none'};
    user-select: none;
    transition: background-color 0.2s ease, border-bottom 0.2s ease, color 0.2s ease;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1000;
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
      height: ${isScrolled ? fontSizeBase * 1.5 : fontSizeBase * 2}px;
      width: auto;
      margin: 0 ${logoMargin}px;
      transition: height 0.2s ease;
    }

    h1 {
      font-size: ${isScrolled ? fontSizeBase * 1.5 : fontSizeBase * 1.75}px;
      color: ${isScrolled ? 'var(--color-primary)' : '#ffffff'};
      margin: 0;
      transition: font-size 0.2s ease, color 0.2s ease;
    }
  `;

  const hamburgerStyles = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: ${logoMargin}px;

    svg {
      fill: ${isScrolled ? 'var(--color-primary)' : '#ffffff'};
      transition: fill 0.2s ease;
    }
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
      color: ${isScrolled ? 'var(--color-secondary)' : '#ffffff'};
      transition: color 0.2s ease-in-out;

      &:hover,
      &:focus {
        color: ${isScrolled ? 'var(--color-primary)' : '#ffffff'};
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
      background-color: ${isScrolled ? 'var(--color-text)' : '#ffffff'};
      margin-right: ${paddingHorizontal}px;
      transition: background-color 0.2s ease;
    }

    button {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      background-color: transparent;
      cursor: pointer;
      font-size: ${fontSizeBase}px;
      color: ${isScrolled ? 'var(--color-primary)' : '#ffffff'};
      transition: background-color 0.2s ease-in-out, color 0.2s ease;
      border: none;

      &:hover {
        background-color: ${isScrolled ? 'var(--color-hover-bg)' : 'rgba(255, 255, 255, 0.2)'};
      }

      svg {
        margin-right: 6px;
        fill: ${isScrolled ? 'var(--color-primary)' : '#ffffff'};
        transition: fill 0.2s ease;
      }
    }
  `;

  return (
    <>
      <header css={headerStyles}>
        <div css={leftContainerStyles}>
          <div css={hamburgerStyles} onClick={toggleMenu}>
            <Hamburger isOpen={isMenuOpen} size="28px" />
          </div>
          <div css={logoContainerStyles}>
            <Logo color={isScrolled ? 'var(--color-primary)' : '#ffffff'} />
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
