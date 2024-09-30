// pages/index.tsx
import { GetServerSideProps } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Shared/Header';
import HeaderSection from '@/components/pages/root/Header';
import MainContent from '@/components/pages/root/MainContent';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }

  try {
    // Verify and decode the JWT token to extract user info
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    // Pass user info to the page as props
    return {
      props: {
        user: {
          userId: decodedToken.userId,
          username: decodedToken.username,
          email: decodedToken.email,
        },
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }
};

interface MainPageProps {
  user?: {
    userId: string;
    username: string;
    email: string;
  };
}

const MainPage = ({ user }: MainPageProps) => {
  const { logout } = useAuth();

  // Check if the user prop exists before rendering
  if (!user) {
    return <p>Loading user data...</p>;
  }

  const contentStyle = {
    // Account for the fixed header height
    marginTop: '0px', // Adjust this value based on your header height
  };

  return (
    <>
      <Header user={user} logout={logout} />
      <div style={contentStyle}>
        <HeaderSection username={user.username} />
        <MainContent />
      </div>
    </>
  );
};

export default MainPage;
