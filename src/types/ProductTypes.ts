// src/types/ProductTypes.ts (Fragmento)

export interface Product {
    id: number; 
    imageUrl?: string;
    name: string;
    description: string; // <-- Asegúrate de tener este campo en Product
    category: string;
    price: string;
    stock: number;
}

export interface ProductForm {
    imageUrl?: string;
    name: string;
    description: string; // <-- Debe existir en el formulario
    category: string;
    price: string;
    stock: number;
}