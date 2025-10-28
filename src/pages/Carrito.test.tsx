import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider } from '../context/cartContex';
import CartPage from './Carrito';
import * as productApi from '../api/productApi';

// --- Simulación (Mock) ---
vi.mock('../api/productApi', async (importOriginal) => {
    const original = await importOriginal() as typeof productApi;
    return {
        ...original,
        updateProductStock: vi.fn(() => true),
    };
});

// --- Mock de localStorage ---
beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
});

// --- Las Pruebas ---
describe('Página del Carrito (Carrito.tsx)', () => {

    it('debería mostrar "El carrito está vacío" si no hay items', () => {
        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );
        expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
        expect(screen.getByText(/Carrito vacío/i)).toBeInTheDocument();
    });

    it('debería mostrar los items del carrito y el total correcto', () => {
        const initialItems = [
            { id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 2 },
            { id: '2', nombre: 'Producto B', precioUnitario: 500, cantidad: 1 },
        ];
        localStorage.setItem('carrito', JSON.stringify(initialItems));
        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('Producto B')).toBeInTheDocument();
        const inputs = screen.getAllByRole('spinbutton');
        expect(inputs[0]).toHaveValue(2);
        expect(inputs[1]).toHaveValue(1);
        expect(screen.getByText(/Total de la compra: \$?2\.500/i)).toBeInTheDocument();
    });

    it('debería llamar a removeItem al hacer clic en Eliminar', () => {
        const initialItems = [{ id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 1 }];
        localStorage.setItem('carrito', JSON.stringify(initialItems));
        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );
        const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
        act(() => { fireEvent.click(deleteButton); });
        expect(screen.queryByText('Producto A')).not.toBeInTheDocument();
        expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
    });

    // --- ✅ PRUEBA CORREGIDA ---
    it('debería llamar a updateQuantity al cambiar el input de cantidad', async () => {
        const initialItems = [{ id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 1 }];
        localStorage.setItem('carrito', JSON.stringify(initialItems));

        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );

        const quantityInput = screen.getByRole('spinbutton');
        expect(quantityInput).toHaveValue(1);

        // Simula el cambio a 3 unidades
        act(() => {
            fireEvent.change(quantityInput, { target: { value: '3' } });
        });

        // Espera que el total se actualice correctamente
        await waitFor(() => {
            expect(
                screen.getByText((content) => content.includes('Total de la compra: $3.000'))
            ).toBeInTheDocument();
        });
    });
    // --- FIN PRUEBA CORREGIDA ---

    it('debería llamar a clearCart y updateProductStock al hacer clic en Pagar (si hay stock)', () => {
        const initialItems = [{ id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 1 }];
        localStorage.setItem('carrito', JSON.stringify(initialItems));
        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );
        const payButton = screen.getByRole('button', { name: /Pagar/i });
        act(() => { fireEvent.click(payButton); });
        expect(productApi.updateProductStock).toHaveBeenCalledWith('1', 1);
        expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
        expect(screen.getByText(/¡Compra procesada con éxito!/i)).toBeInTheDocument();
    });

    it('debería mostrar error si updateProductStock falla al Pagar', () => {
        vi.mocked(productApi.updateProductStock).mockReturnValue(false); // Simula fallo
        const initialItems = [{ id: '1', nombre: 'Producto A', precioUnitario: 1000, cantidad: 1 }];
        localStorage.setItem('carrito', JSON.stringify(initialItems));
        render(
            <BrowserRouter>
                <CartProvider><CartPage /></CartProvider>
            </BrowserRouter>
        );
        const payButton = screen.getByRole('button', { name: /Pagar/i });
        act(() => { fireEvent.click(payButton); });
        expect(productApi.updateProductStock).toHaveBeenCalledWith('1', 1);
        expect(screen.getByText('Producto A')).toBeInTheDocument(); // Carrito no se vació
        expect(screen.getByText(/Error al procesar la compra/i)).toBeInTheDocument();
    });

});
