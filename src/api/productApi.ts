// src/api/productApi.ts

import type { Product, ProductForm } from '../types/ProductTypes'; // Aseguramos las importaciones

const PRODUCT_STORAGE_KEY = 'productos';

// Datos iniciales (Se mantienen igual)
const initialProducts: Product[] = [
    { id: 1, imageUrl: "catan_url", name: "Catan", category: "Juegos de mesa", price: "29.990", stock: 10, description: "Juego de estrategia y comercio." },
    { id: 2, imageUrl: "carcassonne_url", name: "Carcassonne", category: "Juegos de mesa", price: "24.990", stock: 5, description: "Juego de colocación de losetas." },
    { id: 3, imageUrl: "cont_xbox_url", name: "Controlador inalambrico xbox series X", category: "Accesorios", price: "59.990", stock: 20, description: "Controlador oficial para Xbox Series X." },
    { id: 4, imageUrl: "auri_gam_url", name: "Auriculares Gamer hyperX Cloud II ", category: "Accesorios", price: "79.990", stock: 20, description: "Auriculares con sonido 7.1 y micrófono." },
    { id: 5, imageUrl: "play5_url", name: "Playstation 5", category: "Consolas", price: "549.990", stock: 8, description: "Consola de última generación." },
    { id: 6, imageUrl: "pc_gamer_url", name: "PC gamer ASUS ROG STRIX", category: "Computadoras gamers", price: "1299.990", stock: 5, description: "PC con alto rendimiento para juegos." },
    { id: 7, imageUrl: "silla_gamer_st_url", name: "Silla gamer Secretlab titan", category: "Sillas gamer", price: "349.990", stock: 18, description: "Silla ergonómica de alta calidad." },
    { id: 8, imageUrl: "mousepad_razer_url", name: "Mousepad Razer goliathus extended chroma", category: "Mousepads", price: "29.990", stock: 30, description: "Alfombrilla extendida con iluminación RGB." },
    { id: 9, imageUrl: "polera_per_url", name: "Polera gamer personalizada 'level-up'croma", category: "Poleras y polerones personalizados", price: "14.990", stock: 18, description: "Polera con diseño personalizable." },
];

// ------------------------------------------
// --- FUNCIONES INTERNAS (NO EXPORTADAS) ---
// ------------------------------------------

const saveProducts = (products: Product[]): void => {
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
};

const getStoredProducts = (): Product[] => {
    const productsJson = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (productsJson) {
        try {
            return JSON.parse(productsJson) as Product[];
        } catch (e) {
            console.error("Error parsing products from Local Storage:", e);
            return [];
        }
    }
    return [];
};


// ------------------------------------------
// --- FUNCIONES DE LA API PÚBLICA (EXPORTADAS) ---
// ------------------------------------------

export function seedProducts(): void {
    const productsJson = localStorage.getItem(PRODUCT_STORAGE_KEY);
    if (!productsJson) {
        console.log("Seeding initial products...");
        saveProducts(initialProducts);
    }
}

export function getAllProducts(): Product[] {
    return getStoredProducts();
}

export function getProductCount(): number {
    const productsArray = getStoredProducts();
    return productsArray.length;
}

/**
 * Obtiene un producto por su ID (usado por el carrito para validar stock).
 */
export function getProductById(id: string): Product | undefined {
    const products = getAllProducts();
    const idAsNumber = parseInt(id, 10);
    // Buscamos el producto por el ID numérico
    return products.find(p => p.id === idAsNumber); 
}

/**
 * 🔑 FUNCIÓN 1 CORREGIDA: Crea un nuevo producto y lo guarda en localStorage.
 */
export const createProduct = (formData: ProductForm): boolean => { 
    const products = getAllProducts(); 

    // Validaciones de unicidad (ej. por nombre)
    if (products.some(p => p.name.toLowerCase() === formData.name.toLowerCase())) {
        return false; 
    }

    // LÓGICA DE AUTOINCREMENTO: Encontrar el ID numérico más alto.
    const maxId = products.reduce((max: number, product: Product) => { 
        const productIdAsNumber = Number(product.id); 
        return isNaN(productIdAsNumber) ? max : Math.max(max, productIdAsNumber);
    }, 0); 
    
    const newId = maxId + 1; // ID es number
    
    const newProduct: Product = {
        ...formData,
        id: newId, 
    };

    products.push(newProduct);
    saveProducts(products); 
    
    return true; 
};


/**
 * 🔑 FUNCIÓN 2 CORREGIDA: Actualiza el stock de un producto después de una compra.
 */
export function updateProductStock(id: string, quantitySold: number): boolean {
    const products = getAllProducts();
    const idAsNumber = parseInt(id, 10);
    
    const productIndex = products.findIndex(p => p.id === idAsNumber);

    if (productIndex === -1) {
        console.error(`Producto con ID ${id} no encontrado.`);
        return false;
    }

    const currentStock = products[productIndex].stock;
    const newStock = currentStock - quantitySold;

    if (newStock < 0) {
        console.warn(`Error de stock: Venta de ${quantitySold} excede el stock actual de ${currentStock} para el producto ${id}.`);
        return false;
    }

    products[productIndex].stock = newStock;
    saveProducts(products); 

    return true;
}