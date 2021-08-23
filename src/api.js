import axios from 'axios';

const api = axios.create({
  baseURL: '/next',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-store',
  },
});

export default api;
