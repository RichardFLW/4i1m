// services/pexelsService.js
import { createClient } from 'pexels';

const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

export const getImagesByKeyword = async (keyword) => {
  try {
    const response = await client.photos.search({ query: keyword, per_page: 4 });
    return response.photos;
  } catch (error) {
    console.error('Error fetching images from Pexels:', error);
    return [];
  }
};
