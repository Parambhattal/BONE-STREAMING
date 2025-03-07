import axios from 'axios';
import { config } from './config';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: config.api,
});

// Define a generic function for safe API calls
const safeApiCall = async <T>(fn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (error) {
    console.error('API request failed:', error);
    return null; // Return null or a default fallback
  }
};

// Interfaces for API responses
export interface ContentItem {
  id: string;
  title: string;
  poster: string;
  desc: string;
  videoUrl: string; // Added videoUrl for playback
  releaseDate?: string;
  rating?: number;
  duration?: string;
}

export interface CategoryContent {
  ids: string;
  cate: string;
}

// Fetch home content with CORS proxy
export const fetchHomeContent = async (): Promise<ContentItem[] | null> => {
  return safeApiCall(async () => {
    // Use a CORS proxy to bypass CORS restrictions
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example proxy
    const response = await axios.get(`${proxyUrl}${config.api}/homepage.php`);
    return response.data;
  });
};

// Fetch movies with CORS proxy
export const fetchMovies = async (): Promise<ContentItem[] | null> => {
  return safeApiCall(async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example proxy
    const response = await axios.get(`${proxyUrl}${config.api}/homepage.php?p=movie`);
    return response.data;
  });
};

// Fetch TV shows with CORS proxy
export const fetchTVShows = async (): Promise<ContentItem[] | null> => {
  return safeApiCall(async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example proxy
    const response = await axios.get(`${proxyUrl}${config.api}/homepage.php?p=show`);
    return response.data.map((show: any) => ({
      ...show,
      videoUrl: show.id ? `https://s10.nm-cdn2.top/files/${show.id}/720p/-720p.m3u8?in=unknown::ni` : null,
    }));
  });
};

// Fetch details for a specific movie or TV show by ID with CORS proxy
export const fetchDetails = async (id: string, timestamp: string): Promise<ContentItem | null> => {
  return safeApiCall(async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Example proxy
    const response = await axios.get(`${proxyUrl}${config.api}/post.php?id=${id}&t=${timestamp}`);
    if (!response.data) throw new Error('Invalid response data');

    return {
      ...response.data,
      videoUrl: `https://s10.nm-cdn2.top/files/${id}/720p/-720p.m3u8?in=unknown::ni`,
    };
  });
};
