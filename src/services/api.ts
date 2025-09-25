import axios from 'axios';
import { LoginRequest, LoginResponse, Store } from '../types';

const API_BASE_URL = 'https://blinker-api.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

export const storesAPI = {
  getStores: async (): Promise<Store[]> => {
    const response = await api.get('/stores');
    // Handle the API response structure: { objects: [...], total: number }
    return response.data.objects || response.data;
  }
};

export const uploadAPI = {
  uploadFile: async (file: File, storeId: string, onProgress?: (progress: number) => void) => {
    console.log('uploadAPI - Received storeId:', storeId, 'Type:', typeof storeId); // Debug log

    const formData = new FormData();
    formData.append('file', file);
    formData.append('store', storeId);

    console.log('FormData contents:', {
      file: file.name,
      store: formData.get('store')
    }); // Debug log

    const response = await api.post('/inventory/ocs/asn/upload?files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      }
    });

    return response.data;
  }
};

export default api;