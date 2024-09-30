/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const formStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const inputStyle = css`
  margin-bottom: 15px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid var(--color-border);
  border-radius: 2px;
`;

const buttonStyle = css`
  padding: 15px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  font: inherit;
  margin-top: 10px;
`;

const errorStyle = css`
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
`;

const switchTextStyle = css`
  margin-top: 20px;
  font-size: 14px;
  color: var(--color-muted);
  text-align: center;
`;

const linkStyle = css`
  color: var(--color-primary);
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
`;

interface LoginFormProps {
  onSwitch: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const LoginForm = ({ onSwitch, onLogin, loading, error }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      {error && <div css={errorStyle}>{error}</div>}
      <input
        css={inputStyle}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        css={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button css={buttonStyle} type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div css={switchTextStyle}>
        Don&apos;t have an account?
        <span css={linkStyle} onClick={onSwitch}>
          Register here
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
