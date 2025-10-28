// src/context/cartContex.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, CartContextType } from '../types/CartTypes';
// 🔑 Importaciones de API: Asumimos que estas funciones existen.
import { loadCartFromStorage, saveCartToStorage, calculateTotal } from '../api/cartApi'; 
import { getProductById } from '../api/productApi'; 

// 1. Crear el Contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// 2. Hook personalizado (permanece igual)
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
    // Inicialización del estado
    const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
    const [total, setTotal] = useState<number>(0);

    // 🔑 CORRECCIÓN: EFECTO para persistir el carrito (guardar en localStorage)
    useEffect(() => {
        saveCartToStorage(items);
    }, [items]);

    // 🔑 CORRECCIÓN CLAVE: EFECTO para RECALCULAR el total cada vez que 'items' cambia
    useEffect(() => {
        // Asumiendo que calculateTotal es una función síncrona que calcula:
        // items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0)
        const newTotal = calculateTotal(items); 
        setTotal(newTotal);
    }, [items]); // Vuelve a ejecutar cada vez que los items cambian

    // --- Funciones de Modificación ---

    // La firma de esta función debe coincidir con CartContextType (product: CartItem)
    const addItem = (product: CartItem) => {
        
        // CHEQUEO DE STOCK
        const productData = getProductById(product.id);
        if (!productData) {
            console.error(`Producto ID ${product.id} no existe.`);
            return;
        }
        
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            const currentQuantity = existingItem ? existingItem.cantidad : 0;
            
            // Usamos la cantidad que el componente nos pasa (puede ser 1 o más)
            const quantityToAdd = product.cantidad || 1; 
            const nextQuantity = currentQuantity + quantityToAdd;
            
            const availableStock = productData.stock;

            if (nextQuantity > availableStock) {
                console.warn(`No se puede añadir ${quantityToAdd} unidades. El stock máximo permitido es ${availableStock}.`);
                return prevItems;
            }

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, cantidad: nextQuantity }
                        : item
                );
            } else {
                // Se agrega el item completo tal como lo recibimos
                return [
                    ...prevItems,
                    {
                        id: product.id,
                        nombre: product.nombre,
                        precioUnitario: product.precioUnitario,
                        cantidad: quantityToAdd,
                    } as CartItem,
                ];
            }
        });
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        
        // CHEQUEO DE STOCK
        const productData = getProductById(id);
        if (!productData) return;

        const qty = Math.max(1, newQuantity);
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