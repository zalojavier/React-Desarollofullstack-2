// src/context/cartContex.tsx (MODIFICADO)

import React, { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';
import type { CartItem, CartContextType } from '../types/CartTypes';
import { loadCartFromStorage, saveCartToStorage, calculateTotal } from '../api/cartApi';
import { getProductById } from '../api/productApi'; // 🔑 Importamos la nueva función

// 1. Crear el Contexto (permanece igual)
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Hook personalizado para usar el Contexto (permanece igual)
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 3. Proveedor del Contexto (Lógica)
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  // ... (useEffect hooks permanecen igual) ...

  // --- Funciones de Modificación ---

  const addItem = (product: { id: string; nombre: string; precio: number }) => {
    
    // 🔑 CHEQUEO DE STOCK para AÑADIR
    const productData = getProductById(product.id);
    if (!productData) {
        console.error(`Producto ID ${product.id} no existe.`);
        return;
    }
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      const currentQuantity = existingItem ? existingItem.cantidad : 0;
      const nextQuantity = currentQuantity + 1;
      const availableStock = productData.stock; // Stock disponible

      if (nextQuantity > availableStock) {
        console.warn(`No se puede añadir más de ${availableStock} unidades de ${product.nombre}. Stock actual: ${currentQuantity}.`);
        return prevItems; // No hay cambios
      }

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, cantidad: nextQuantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            nombre: product.nombre,
            precioUnitario: product.precio,
            cantidad: 1,
          } as CartItem,
        ];
      }
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    
    // 🔑 CHEQUEO DE STOCK para ACTUALIZAR CANTIDAD
    const productData = getProductById(id);
    if (!productData) return;

    const qty = Math.max(1, newQuantity); // Asegurar que la cantidad sea al menos 1
    const availableStock = productData.stock;

    if (qty > availableStock) {
        console.warn(`La cantidad solicitada (${qty}) excede el stock disponible (${availableStock}). Ajustando al máximo.`);
        const adjustedQty = availableStock;

        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, cantidad: adjustedQty } : item
            )
        );
        return; 
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, cantidad: qty } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const contextValue: CartContextType = {
    items,
    total,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};