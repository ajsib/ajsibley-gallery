// pages/welcome/index.tsx
/** @jsxImportSource @emotion/react */
import { GetServerSideProps } from 'next';
import { redirectIfAuthenticated } from '@/utils/authentication/redirectIfAuthenticated';
import AuthContainer from '@/components/pages/welcome/AuthContainer';
import { css } from '@emotion/react';

const pageStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-background);
`;

export const getServerSideProps: GetServerSideProps = redirectIfAuthenticated;

export default function WelcomePage() {
  return (
    <div css={pageStyle}>
      <AuthContainer />
    </div>
  );
}