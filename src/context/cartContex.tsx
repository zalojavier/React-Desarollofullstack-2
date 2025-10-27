import React, { createContext, useContext, useState, useEffect } from 'react';
import type {ReactNode} from 'react';
import type { CartItem, CartContextType } from '../types/CartTypes';
import { loadCartFromStorage, saveCartToStorage, calculateTotal } from '../api/cartApi';

// 1. Crear el Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Hook personalizado para usar el Contexto
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

  // Cargar estado inicial desde localStorage al montar
  useEffect(() => {
    const initialItems = loadCartFromStorage();
    setItems(initialItems);
    setTotal(calculateTotal(initialItems));
  }, []);

  // Sincronizar estado a localStorage cada vez que 'items' cambie
  useEffect(() => {
    saveCartToStorage(items);
    setTotal(calculateTotal(items));
  }, [items]);

  // --- Funciones de Modificación (Reemplazan la lógica de Js/carrito.js) ---

  const addItem = (product: { id: string; nombre: string; precio: number }) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
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
    const qty = Math.max(1, newQuantity); // Asegurar que la cantidad sea al menos 1
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
