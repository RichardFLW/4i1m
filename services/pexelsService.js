import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/';

export const getImagesByKeyword = async (keyword) => {
  try {
    const response = await axios.get(`${BASE_URL}search`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: keyword,
        per_page: 4,
      },
    });
    return response.data.photos;
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
};

export const getRateLimitStats = async () => {
  try {
    const response = await axios.get(`${BASE_URL}search`, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: 'test', // Utilisez un mot-clé quelconque pour effectuer une requête
        per_page: 1,
      },
    });
    return {
      limit: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining'],
      reset: response.headers['x-ratelimit-reset'],
    };
  } catch (error) {
    console.error('Error fetching rate limit stats from Pexels:', error);
    return null;
  }
};
