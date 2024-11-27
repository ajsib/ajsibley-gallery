// utils/auth.ts
import { GetServerSidePropsContext } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export const authenticateUser = async (context: GetServerSidePropsContext) => {
  const { req, resolvedUrl } = context;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: `/welcome?redirectTo=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    return {
      props: {
        user: {
          userId: decodedToken.userId,
          username: decodedToken.username,
          email: decodedToken.email,
        },
      },
    };
  } catch {
    return {
      redirect: {
        destination: `/welcome?redirectTo=${encodeURIComponent(resolvedUrl)}`,
        permanent: false,
      },
    };
  }
};
