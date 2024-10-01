// @/components/pages/root/services.ts
import Cookies from 'js-cookie';

/**
 * Register a new user
 * @param username - The username of the user
 * @param email - The email of the user
 * @param password - The password of the user
 */
export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to register');
  }

  const data = await response.json();

  // Set the token in cookies
  Cookies.set('token', data.token, { expires: 1 }); // 1 day expiration

  // Reload the page to reflect authentication status
  window.location.reload();

  return data;
};

/**
 * Log in a user
 * @param email - The email of the user
 * @param password - The password of the user
 */
export const loginUser = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to log in');
  }

  const data = await response.json();

  // Set the token in cookies
  Cookies.set('token', data.token, { expires: 1 }); // 1 day expiration

  // Reload the page to reflect authentication status
  window.location.reload();

  return data;
};