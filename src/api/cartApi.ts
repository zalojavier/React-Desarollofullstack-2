import type { CartItem } from '../types/CartTypes';

const CART_STORAGE_KEY = 'carrito';

/**
 * Carga el carrito desde localStorage.
 */
export const loadCartFromStorage = (): CartItem[] => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart === null) {
      return [];
    }
    // Asegurarse de que los precios y cantidades son números
    const rawItems: CartItem[] = JSON.parse(serializedCart);
    return rawItems.map(item => ({
      ...item,
      precioUnitario: Number(item.precioUnitario),
      cantidad: Number(item.cantidad),
    }));
  } catch (error) {
    console.error("Error al cargar el carrito de localStorage:", error);
    return [];
  }
};

/**
 * Guarda el carrito en localStorage.
 */
export const saveCartToStorage = (items: CartItem[]): void => {
  try {
    const serializedCart = JSON.stringify(items);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }
};

/**
 * Calcula el total de la compra.
 */
export const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
};
