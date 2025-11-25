// src/api/axiosClient.ts
import axios, { AxiosInstance } from 'axios';

// URL de tu Backend Spring Boot
const API_URL = 'http://localhost:8080/api';

const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR: Adjuntar token si existe
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwt_token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;