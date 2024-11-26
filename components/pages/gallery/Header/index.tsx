/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

interface HeaderProps {
  galleryName: string;
  galleryDescription?: string;
}

const HeaderSection = ({ galleryName, galleryDescription }: HeaderProps) => {
  const headerContainer = css`
    position: relative;
    width: 100%;
    height: 300px;
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
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.1)
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-align: center;
  `;

  const titleText = css`
    font-size: 36px;
    color: white;
    margin: 0;
    font-weight: bold;
    transform: translateY(30px);
  `;

  const descriptionText = css`
    font-size: 20px;
    margin-top: 10px;
    color: white;
    transform: translateY(30px);
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
        <h1 css={titleText}>{galleryName}</h1>
        {galleryDescription && <p css={descriptionText}>{galleryDescription}</p>}
      </div>
    </div>
  );
};

export default HeaderSection;
