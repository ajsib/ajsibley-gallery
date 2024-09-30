// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Import global styles
import { AuthProvider } from '@/context/AuthContext'; // Import AuthContext for global state

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
