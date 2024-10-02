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
  // Parse cookies from the request
  const cookies = cookie.parse(req.headers.cookie || '');

  const token = cookies.token; // Get token from cookie

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (req as any).user = decoded; // Attach decoded user data to the request

    return handler(req, res); // Proceed to the next handler
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized, invalid token' });
  }
};
