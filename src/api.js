import axios from 'axios';

// In development, we use the Vite proxy to avoid CORS issues.
// In production, we'd use the real URL (assuming CORS is configured there or same-domain).
const BASE_URL = import.meta.env.DEV 
  ? '/api' 
  : 'https://untidal-glossier-khalil.ngrok-free.dev';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to handle ngrok browser warning
api.interceptors.request.use((config) => {
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

export const createReel = async (payload) => {
  const response = await api.post('/reels', payload);
  return response.data;
};

export const getReelStatus = async (jobId) => {
  const response = await api.get(`/reels/${jobId}`);
  return response.data;
};

export default api;
