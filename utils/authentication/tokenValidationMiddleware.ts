// @/utils/authentication/tokenValidationMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookie from 'cookie';

// Define the shape of the decoded token
interface DecodedToken extends JwtPayload {
  userId: string;
  username: string;
  email: string;
}

// Define a higher-order function to validate the token
export const validateToken = (
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) => async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  console.log('Executing validateToken middleware');
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log('Cookies:', cookies);

  const token = cookies.token;

  if (!token) {
    console.error('Token missing in request');
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    console.log('Decoded Token:', decoded);
    (req as any).user = decoded;
    return handler(req, res);
  } catch (error) {
    console.error('Token validation failed:', error);
    return res.status(401).json({ error: 'Unauthorized, invalid token' });
  }
};
