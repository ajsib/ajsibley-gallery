// @/components/pages/root/services.ts
import Cookies from 'js-cookie';

/**
 * Logs out the user by calling the logout API and clearing the token from cookies.
 */
export const logoutUser = async () => {

  try {
    // Make an API call to log the user out
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    // Remove the token from cookies
    Cookies.remove('token');

    window.location.reload();

  } catch (error) {
    console.error('Error logging out:', error);
  }
};
