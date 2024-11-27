// utils/redirectIfAuthenticated.ts
import { GetServerSidePropsContext } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export const redirectIfAuthenticated = async (context: GetServerSidePropsContext) => {
  const { req, query } = context;
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const token = cookies.token;
  const redirectTo = query.redirectTo as string || '/';

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      return {
        redirect: {
          destination: redirectTo,
          permanent: false,
        },
      };
    } catch {
      // Invalid token, continue to render the page
    }
  }

  return { props: {} };
};
