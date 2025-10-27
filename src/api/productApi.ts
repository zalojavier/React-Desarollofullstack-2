import { Product } from '../types/ProductTypes';

const PRODUCT_STORAGE_KEY = 'productos';

// Datos iniciales de productos basados en AppDatabase.kt
const initialProducts: Product[] = [
  {
    id: 1,
    imageUrl: "catan_url",
    name: "Catan",
    category: "Juegos de mesa",
    price: "29.990",
    stock: 10,
  },
  {
    id: 2,
    imageUrl: "carcassonne_url",
    name: "Carcassonne",
    category: "Juegos de mesa",
    price: "24.990",
    stock: 5,
  },
  {
    id: 3,
    imageUrl: "cont_xbox_url",
    name: "Controlador inalambrico xbox series X",
    category: "Accesorios",
    price: "59.990",
    stock: 20,
  },
  {
    id: 4,
    imageUrl: "auri_gam_url",
    name: "Auriculares Gamer hyperX Cloud II ",
    category: "Accesorios",
    price: "79.990",
    stock: 20,
  },
  {
    id: 5,
    imageUrl: "play5_url",
    name: "Playstation 5",
    category: "Consolas",
    price: "549.990",
    stock: 8,
  },
  {
    id: 6,
    imageUrl: "pc_gamer_url",
    name: "PC gamer ASUS ROG STRIX",
    category: "Computadoras gamers",
    price: "1299.990",
    stock: 5,
  },
  {
    id: 7,
    imageUrl: "silla_gamer_st_url",
    name: "Silla gamer Secretlab titan",
    category: "Sillas gamer",
    price: "349.990",
    stock: 18,
  },
  {
    id: 8,
    imageUrl: "mousepad_razer_url",
    name: "Mousepad Razer goliathus extended chroma",
    category: "Mousepads",
    price: "29.990",
    stock: 30,
  },
  {
    id: 9,
    imageUrl: "polera_per_url",
    name: "Polera gamer personalizada 'level-up'croma",
    category: "Poleras y polerones personalizados",
    price: "14.990",
    stock: 18,
  },
];

/**
 * Inicializa los productos en Local Storage si no existen.
 * Esto simula el "seeding" de datos en onCreate de Room Database.
 */
export const seedProducts = (): void => {
  const productsJson = localStorage.getItem(PRODUCT_STORAGE_KEY);
  if (!productsJson) {
    console.log("Seeding initial products...");
    localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(initialProducts));
  }
}

/**
 * Obtiene todos los productos desde Local Storage.
 */
export const getAllProducts = (): Product[] => {
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
}

// Aquí se agregarían funciones para crear, editar y eliminar productos (CRUD)