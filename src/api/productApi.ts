// src/api/productApi.ts
import type { Product, ProductForm } from '../types/ProductTypes';
import axiosClient from './axiosClient'; // Importa el archivo que acabamos de arreglar

// --- FUNCIONES DE LA API ---

export async function getAllProducts(): Promise<Product[]> {
    try {
        const response = await axiosClient.get('/products');
        return response.data.map((item: any) => ({
            id: item.idProducto,
            name: item.nombreProducto,
            category: item.categoria || 'Sin Categoría', 
            price: String(item.price),
            stock: item.stock,
            imageUrl: item.imageUrl || '', 
            description: item.description || 'Descripción no disponible en BD' 
        }));
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    try {
        const response = await axiosClient.get(`/products/${id}`);
        const item = response.data;
        return {
            id: item.idProducto,
            name: item.nombreProducto,
            category: item.categoria || 'Sin Categoría',
            price: String(item.price),
            stock: item.stock,
            imageUrl: item.imageUrl || '',
            description: item.description || 'Descripción no disponible en BD'
        };
    } catch (error) {
        console.error(`Error al obtener producto con ID ${id}:`, error);
        return undefined;
    }
}

export async function createProduct(formData: ProductForm): Promise<boolean> { 
    try {
        const payload = {
            nombreProducto: formData.name,
            categoria: formData.category,
            price: parseInt(formData.price),
            stock: formData.stock,
            imageUrl: formData.imageUrl || ''
        };
        await axiosClient.post('/products', payload);
        return true; 
    } catch (error) {
        console.error("Error al crear producto:", (error as any).response?.data || error);
        return false; 
    }
}

export async function updateProductStock(id: string, quantitySold: number): Promise<boolean> {
    try {
        await axiosClient.put(`/products/decrease-stock/${id}`, { quantity: quantitySold });
        return true; 
    } catch (error) {
        console.error("Error al actualizar stock:", error);
        return false;
    }
}

export const getProductCount = async (): Promise<number> => {
    try {
        const response = await axiosClient.get('/products/count');
        return response.data;
    } catch (error) {
        return 0;
    }
};