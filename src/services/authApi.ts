import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || 'https://dessertshopbackend.onrender.com/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const forgotPassword = async (email: string) => {
  const response = await authApi.post('/auth/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await authApi.post(`/auth/reset-password/${token}`, { password });
  return response.data;
};