/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { authenticateUser } from '@/utils/authentication/auth';
import { logoutUser } from '@/components/pages/root/services';
import Header from '@/components/Shared/Header';
import HeaderSection from '@/components/pages/gallery/Header';
import MainContent from '@/components/pages/gallery/MainContent';
import { GalleryProvider, useGalleryContext } from '@/components/pages/gallery/MainContent/GalleryContext';

export const getServerSideProps: GetServerSideProps = authenticateUser;

interface GalleryDetailsProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

const GalleryDetails = ({ user }: GalleryDetailsProps) => {
  const router = useRouter();
  const { id } = router.query;

  const pageStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    text-align: center;
    padding: 0;
    margin: 0;
  `;

  const contentStyle = css`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  `;

  if (!user) {
    return <div>Loading user data...</div>;
  }

  if (!id || typeof id !== 'string') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header user={user} logout={logoutUser} />
      <div css={pageStyle}>
        <GalleryProvider>
          <HeaderSectionFromContext />
          <div css={contentStyle}>
            <MainContent galleryId={id} />
          </div>
        </GalleryProvider>
      </div>
    </>
  );
};

// Component to display header section with context data
const HeaderSectionFromContext = () => {
  const { galleryName, galleryDescription } = useGalleryContext();

  return <HeaderSection galleryName={galleryName} galleryDescription={galleryDescription} />;
};

export default GalleryDetails;
