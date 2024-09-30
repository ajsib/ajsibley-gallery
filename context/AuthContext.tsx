import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state to prevent flickering
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1 }); // Set the token in cookies with 1 day expiry
    setIsAuthenticated(true);
    router.push('/');
  };

  const logout = async () => {
    // Call the logout API to remove the token cookie server-side
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
  
    // Clear authentication state and redirect the user
    setIsAuthenticated(false);
    router.push('/welcome');
  };
  
  

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while authentication state is determined
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
