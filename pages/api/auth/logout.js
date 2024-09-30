// pages/api/auth/logout.js
import cookie from 'cookie';

export default function handler(req, res) {
  // Remove the token cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      expires: new Date(0), // Expire immediately
      path: '/', // Ensure the path matches the one where the token was set
    })
  );
  res.status(200).json({ message: 'Logged out successfully' });
}
