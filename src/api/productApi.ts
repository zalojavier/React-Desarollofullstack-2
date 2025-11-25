// src/api/productApi.ts (Versión INTEGRADA CON BACKEND)

import type { Product, ProductForm } from '../types/ProductTypes'; 
// Importamos el cliente Axios configurado
import axiosClient  from './axiosClient';

// --- FUNCIONES DE LA API PÚBLICA (EXPORTADAS) ---

/**
 * Obtiene todos los productos del backend (Ruta protegida para CLIENTE y ADMIN).
 * @returns {Promise<Product[]>} La lista de productos.
 */
export async function getAllProducts(): Promise<Product[]> {
    try {
        // Endpoint: GET /api/products
        const response = await axiosClient.get('/products');
        
        // El backend devuelve los datos en response.data
        return response.data as Product[];
        
    } catch (error) {
        console.error("Error al obtener productos:", error);
        
        // Si el token expira o el rol no tiene acceso, se lanzará una excepción (401/403)
        // Puedes agregar lógica de manejo de errores aquí (ej. si es 403, redirigir a Home)
        return [];
    }
}

/**
 * Obtiene un solo producto por su ID (Ruta protegida para CLIENTE y ADMIN).
 */
export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        // Endpoint: GET /api/products/{id}
        const response = await axiosClient.get(`/products/${id}`);
        
        return response.data as Product;
        
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        return undefined;
    }
    
}

/**
 * Crea un nuevo producto (Ruta protegida, requiere rol ADMINISTRADOR).
 */
export async function createProduct(formData: ProductForm): Promise<boolean> { 
    try {
        // Endpoint: POST /api/products
        await axiosClient.post('/products', formData);
        
        return true; 
        
    } catch (error) {
        console.error("Error al crear producto:", (error as any).response?.data || error);
        // El backend maneja la validación de unicidad (nombre duplicado) y devuelve 400
        return false; 
    }
}

/**
 */
export async function updateProductStock(id: string, quantitySold: number): Promise<boolean> {
    try {
        // Endpoint: PUT /api/products/decrease-stock/{id}
        // El body debe ser un JSON con la cantidad a disminuir: {"quantity": 5}
        await axiosClient.put(`/products/decrease-stock/${id}`, { quantity: quantitySold });
        
        return true; 
    } catch (error) {
        console.error("Error al actualizar stock:", (error as any).response?.data || error);
        // Maneja errores de stock insuficiente (lanza RuntimeException en el backend)
        return false;
    }
}
export const getProductCount = async (): Promise<number> => {
    try {
        // Hacemos la petición al endpoint que trae los productos
        const response = await axiosClient.get('/products');
        
        // Verificamos que sea un array y retornamos su longitud
        if (Array.isArray(response.data)) {
            return response.data.length;
        }
        
        return 0; // Si no es un array, asumimos que hay 0
    } catch (error) {
        console.error("Error al obtener el conteo de productos:", error);
        return 0; // En caso de error, retornamos 0 para no romper la interfaz
    }
};
// Funciones obsoletas que ya no se usan con el backend:
// export function seedProducts(): void { /* Ya no es necesario sembrar desde el frontend */ }
// export function getProductCount(): number { /* Haz una llamada API si necesitas el conteo */ return 0; }