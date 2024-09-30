/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface HeaderProps {
  username: string;
}

const HeaderSection = ({ username }: HeaderProps) => {
  const [greeting, setGreeting] = useState('');

  // Dynamically update greeting based on time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const headerContainer = css`
    position: relative;
    width: 100%;
    height: 300px; /* Adjust height as needed */
    overflow: hidden;
  `;

  const imageStyle = css`
    filter: grayscale(50%);
  `;

  const overlay = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),  /* Darker at the top */
      rgba(0, 0, 0, 0.1)   /* Lighter at the bottom */
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
  `;

  const greetingText = css`
    font-size: 36px;
    color: white;
    margin: 0;
    font-weight: bold;
    transform: translateY(30px); /* Offset to account for the top header */
  `;

  const subText = css`
    font-size: 20px;
    margin-top: 10px;
    color: white;
    transform: translateY(30px); /* Offset to balance the design */
  `;

  return (
    <div css={headerContainer}>
      <Image
        src="/images/header.png"
        alt="Header Image"
        layout="fill"
        objectFit="cover"
        css={imageStyle}
        priority
      />
      <div css={overlay}>
        <h1 css={greetingText}>{greeting}, {username}!</h1>
        <p css={subText}>Here's your photo gallery dashboard.</p>
      </div>
    </div>
  );
};

export default HeaderSection;
