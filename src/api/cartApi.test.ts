import { describe, it, expect } from 'vitest';
import { calculateTotal } from './cartApi'; // Importa la función a probar
import type { CartItem } from '../types/CartTypes'; // Importa el tipo

describe('API del Carrito (cartApi)', () => {

  describe('calculateTotal', () => {

    it('debería devolver 0 para un carrito vacío', () => {
      const items: CartItem[] = [];
      expect(calculateTotal(items)).toBe(0);
    });

    it('debería calcular el total para un solo item', () => {
      const items: CartItem[] = [
        { id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 1 },
      ];
      expect(calculateTotal(items)).toBe(1000);
    });

    it('debería calcular el total para un item con cantidad múltiple', () => {
      const items: CartItem[] = [
        { id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 3 },
      ];
      expect(calculateTotal(items)).toBe(3000);
    });

    it('debería calcular el total para múltiples items', () => {
      const items: CartItem[] = [
        { id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 2 }, // 2000
        { id: '2', nombre: 'Producto B', precioUnitario: 500, cantidad: 1 },  // 500
        { id: '3', nombre: 'Producto C', precioUnitario: 200, cantidad: 5 },  // 1000
      ];
      expect(calculateTotal(items)).toBe(3500); // 2000 + 500 + 1000
    });
  });

  // Aquí podrías añadir pruebas para saveCartToStorage y loadCartFromStorage,
  // aunque requerirían "simular" (mockear) localStorage.

});