// /pages/gallery/[id].tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { authenticateUser } from '@/utils/authentication/auth';
import { logoutUser } from '@/components/pages/root/services';
import Header from '@/components/Shared/Header';
import HeaderSection from '@/components/pages/gallery/Header';
import MainContent from '@/components/pages/gallery/MainContent';
import { GalleryProvider } from '@/components/pages/gallery/MainContent/GalleryContext';
import { getGalleryFiles } from '@/components/pages/gallery/services';
import { useEffect, useState } from 'react';

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

  const [galleryName, setGalleryName] = useState('');
  const [galleryDescription, setGalleryDescription] = useState('');

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

  useEffect(() => {
    const fetchGalleryInfo = async () => {
      if (id && typeof id === 'string') {
        try {
          const data = await getGalleryFiles(id);
          setGalleryName(data.gallery.name);
          setGalleryDescription(data.gallery.description);
        } catch (error) {
          console.error('Error fetching gallery info:', error);
        }
      }
    };

    fetchGalleryInfo();
  }, [id]);

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
        <HeaderSection galleryName={galleryName} galleryDescription={galleryDescription} />
        <div css={contentStyle}>
          <GalleryProvider>
            <MainContent galleryId={id} />
          </GalleryProvider>
        </div>
      </div>
    </>
  );
};

export default GalleryDetails;
