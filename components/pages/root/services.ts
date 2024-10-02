// @/components/pages/root/services.ts
import Cookies from 'js-cookie';
import { Gallery } from '@/components/types';

/**
 * Logs out the user by calling the logout API and clearing the token from cookies.
 */
export const logoutUser = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    Cookies.remove('token');
    window.location.reload();
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

/**
 * Creates a new gallery by making a POST request to the API.
 * @param {string} name - The name of the new gallery.
 * @param {string} description - The description of the new gallery.
 * @returns {Promise<Gallery>} - Returns the created gallery data.
 */
export const createNewGallery = async (
  name: string,
  description: string
): Promise<Gallery> => {
  try {
    const response = await fetch('/api/galleries/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create gallery');
    }

    // Return the created gallery data directly
    const galleryData = await response.json();
    return galleryData.gallery;
  } catch (error) {
    console.error('Error creating gallery:', error);
    throw error;
  }
};


/**
 * Fetches galleries from the API and returns the data
 * @returns {Promise<Gallery[]>} - The galleries data
 */
export const getGalleries = async (): Promise<Gallery[]> => {
  try {
    const response = await fetch('/api/galleries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch galleries');
    }

    const data = await response.json();
    // Return the fetched galleries data
    return data.galleries;
  } catch (error) {
    console.error('Error fetching galleries:', error);
    throw error;
  }
};
