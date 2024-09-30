// pages/welcome/index.tsx
/** @jsxImportSource @emotion/react */
import { GetServerSideProps } from 'next';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import AuthContainer from '@/components/pages/welcome/AuthContainer';
import { css } from '@emotion/react';

const pageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  
  // Parse cookies to check for the JWT token
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.token;

  if (token) {
    try {
      // Verify the JWT token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not defined');
      }
      jwt.verify(token, secret);
      // If the token is valid, redirect to the main page
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    } catch {
      // Token is invalid or expired, no redirect needed, continue rendering welcome page
    }
  }

  // If there's no token or it's invalid, render the welcome page
  return {
    props: {}, // No props needed for the welcome page
  };
};

export default function WelcomePage() {
  return (
    <div css={pageStyle}>
      <AuthContainer />
    </div>
  );
}
