// pages/index.tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import { authenticateUser } from '@/utils/authentication/auth';
import { logoutUser } from '@/components/pages/root/services'
import Header from '@/components/Shared/Header';
import HeaderSection from '@/components/pages/root/Header';
import MainContent from '@/components/pages/root/MainContent';

export const getServerSideProps: GetServerSideProps = authenticateUser;

interface MainPageProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

const MainPage = ({ user }: MainPageProps) => {

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const contentStyle =  css`
    min-height: calc(100vh + 45px);
  `

  return (
    <>
      <Header user={user} logout={logoutUser} />
      <div css={contentStyle}>
        <HeaderSection username={user.username} />
        <MainContent />
      </div>
    </>
  );
};

export default MainPage;
