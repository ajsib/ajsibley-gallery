/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '@/context/AuthContext'; // Use the AuthContext
import { registerUser, loginUser } from './services';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: var(--color-component-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const headerStyle = css`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--color-primary);
`;

const subheaderStyle = css`
  font-size: 18px;
  color: var(--color-muted);
  margin-bottom: 30px;
  text-align: center;
`;

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth(); // Use login from AuthContext

  // Handle login API call
  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const result = await loginUser(email, password); // Login API call
      login(result.token); // Store token and set user as logged in
    } catch (e: unknown) {  // Replace `any` with `unknown`
      if (e instanceof Error) {  // Type guard for `Error` type
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle registration API call
  const handleRegister = async (username: string, email: string, password: string, confirmPassword: string) => {
    setLoading(true);
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    try {
      const result = await registerUser(username, email, password); // Register API call
      login(result.token); // Store token after successful registration
    } catch (e: unknown) {  // Replace `any` with `unknown`
      if (e instanceof Error) {  // Type guard for `Error` type
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={containerStyle}>
      <h1 css={headerStyle}>AJSibley Photo Gallery</h1>
      <p css={subheaderStyle}>
        Share your photos effortlessly. Create galleries and enjoy secure cloud storage.
      </p>
      {isLogin ? (
        <LoginForm onSwitch={() => setIsLogin(false)} onLogin={handleLogin} loading={loading} error={error} />
      ) : (
        <RegisterForm onSwitch={() => setIsLogin(true)} onRegister={handleRegister} loading={loading} error={error} />
      )}
    </div>
  );
};

export default AuthContainer;
