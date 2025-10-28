

export interface Product {
    id: number; 
    imageUrl?: string;
    name: string;
    description: string; 
    category: string;
    price: string;
    stock: number;
}

export interface ProductForm {
    imageUrl?: string;
    name: string;
    description: string; 
    category: string;
    price: string;
    stock: number;
}