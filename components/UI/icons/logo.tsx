/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

interface LogoProps {
  size?: number; // Size in pixels
  color?: string; // Color of the logo
}

const Logo: React.FC<LogoProps> = ({
  size = 1000,
  color = '#000000',
}) => {
  const logoStyles = css`
    width: ${size}px;
    height: ${size}px;
    display: block;

    .logo-color {
      fill: ${color};
    }
  `;

  return (
    <svg
      css={logoStyles}
      width={size}
      height={size}
      viewBox="0 0 264.58333 264.58333"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className="logo-color"
          style={{
            fontWeight: 'bold',
            fontSize: '158.75px',
            fillOpacity: 1,
            strokeWidth: 0.436097,
          }}
          d="m 126.02725,31.436379 117.9033,0.600228 14.52605,19.726262 -23.27658,127.902811 -24.27924,-32.97119 18.44834,-84.79686 -79.04267,2.509826 z M 185.15428,260.38972 77.297474,26.435315 97.754929,9.8161603 205.61167,243.77054 Z M 74.538229,125.96019 l -22.183655,79.72425 82.777956,2.56265 24.2792,32.9711 L 35.697985,232.72739 21.171968,213.0011 50.258974,92.988903 Z"
          aria-label="&lt;/&gt;"
        />
        <path
          className="logo-color"
          style={{
            fontSize: '266.28px',
            fontFamily: 'De',
            fillOpacity: 1,
            strokeWidth: 0.386278,
          }}
          d="M 40.076023,254.57819 3.2146794,254.07332 42.581359,126.67673 l 32.078904,0.14448 z"
          aria-label="A"
        />
        <path
          className="logo-color"
          style={{
            fontWeight: 'bold',
            fontSize: '158.75px',
            fillOpacity: 1,
            strokeWidth: 0.360796,
          }}
          d="m 78.948186,131.87729 -23.187218,63.84883 70.967652,1.07101 19.14485,26.0124 -105.821293,-5.31817 -11.454201,-15.56294 31.20531,-96.06358 z"
          aria-label="&lt;/&gt;"
        />
      </g>
    </svg>
  );
};

export default Logo;
