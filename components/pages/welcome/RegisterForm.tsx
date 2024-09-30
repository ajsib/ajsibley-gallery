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

interface RegisterFormProps {
  onSwitch: () => void;
  onRegister: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  loading: boolean;
  error: string;
}

const RegisterForm = ({ onSwitch, onRegister, loading, error }: RegisterFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(username, email, password, confirmPassword);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      {error && <div css={errorStyle}>{error}</div>}
      <input
        css={inputStyle}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <input
        css={inputStyle}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button css={buttonStyle} type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <div css={switchTextStyle}>
        Already have an account?
        <span css={linkStyle} onClick={onSwitch}>
          Login here
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
