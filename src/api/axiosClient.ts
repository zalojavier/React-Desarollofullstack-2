// src/api/axiosClient.ts

import axios, { AxiosInstance } from 'axios';


const API_URL = '/api';

const axiosClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// INTERCEPTOR: Se ejecuta antes de enviar cada petición
axiosClient.interceptors.request.use((config) => {
    // 1. Obtiene el token guardado durante el login
    const token = localStorage.getItem('jwt_token'); 

    // 2. Si hay token, lo adjunta en el encabezado 'Authorization'
    if (token) {
        // Formato requerido por Spring Security: Bearer <TOKEN>
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;