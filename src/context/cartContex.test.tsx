import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartProvider, useCart } from './cartContex'; // Importa el Provider y el Hook
import * as productApi from '../api/productApi'; // Importamos la API de productos para simularla

// --- Simulación (Mock) de productApi ---
// Simulamos que siempre hay stock suficiente para simplificar las pruebas iniciales
vi.mock('../api/productApi', () => ({
  getProductById: vi.fn((id: string) => ({
    id: parseInt(id, 10),
    name: `Producto ${id}`,
    category: 'Test',
    price: '1000', // Precio base para pruebas
    stock: 10,     // Stock suficiente por defecto
    imageUrl: '',
    description: '',
  })),
  // Simula otras funciones si son necesarias
  getAllProducts: vi.fn(() => []),
  updateProductStock: vi.fn(() => true), // Simula que la actualización de stock siempre funciona
  seedProducts: vi.fn(), // Añadido para completar el mock
  getProductCount: vi.fn(() => 0), // Añadido para completar el mock
  createProduct: vi.fn(() => true), // Añadido para completar el mock
}));

// --- Mock de localStorage (para evitar errores en entorno de test) ---
// Vitest a veces tiene problemas con localStorage directamente
beforeEach(() => {
  // Limpiamos localStorage antes de cada test
  localStorage.clear();
  // Reseteamos las llamadas a funciones mockeadas
  vi.clearAllMocks();
});

// --- Componente de Ayuda para Probar el Contexto ---
function TestComponent() {
  const { items, total, addItem, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <div>
      <div data-testid="total">Total: {total}</div>
      <ul data-testid="cart-items">
        {items.map(item => (
          <li key={item.id}>
            {item.nombre} - Cant: {item.cantidad} - Precio: {item.precioUnitario}
            <button onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+1</button>
            <button onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-1</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addItem({ id: '1', nombre: 'Test Prod 1', precioUnitario: 1000, cantidad: 1 })}>Add Prod 1</button>
      <button onClick={() => addItem({ id: '2', nombre: 'Test Prod 2', precioUnitario: 500, cantidad: 2 })}>Add Prod 2 (Qty 2)</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

// --- Las Pruebas ---
describe('Contexto del Carrito (CartContext)', () => {

  it('debería inicializar vacío y con total 0', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('total').textContent).toBe('Total: 0');
    expect(screen.getByTestId('cart-items').children.length).toBe(0);
  });

  it('debería añadir un item al carrito', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
    act(() => { // Usamos act para envolver actualizaciones de estado
      fireEvent.click(addButton);
    });

    expect(screen.getByTestId('total').textContent).toBe('Total: 1000');
    expect(screen.getByTestId('cart-items').children.length).toBe(1);
    expect(screen.getByText(/Test Prod 1 - Cant: 1/)).toBeInTheDocument();
  });

  it('debería incrementar la cantidad si se añade el mismo item', () => {
     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
    act(() => {
      fireEvent.click(addButton); // Cantidad 1
    });
     act(() => {
      fireEvent.click(addButton); // Cantidad 2
    });

    expect(screen.getByTestId('total').textContent).toBe('Total: 2000');
    expect(screen.getByTestId('cart-items').children.length).toBe(1); // Sigue siendo 1 item
    expect(screen.getByText(/Test Prod 1 - Cant: 2/)).toBeInTheDocument();
  });

  it('debería actualizar la cantidad de un item', () => {
     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
     act(() => {
      fireEvent.click(addButton); // Añade Prod 1
    });
    const plusButton = screen.getByText('+1');
    act(() => {
        fireEvent.click(plusButton); // Incrementa a 2
    });
    expect(screen.getByText(/Test Prod 1 - Cant: 2/)).toBeInTheDocument();
    expect(screen.getByTestId('total').textContent).toBe('Total: 2000');

    const minusButton = screen.getByText('-1');
     act(() => {
        fireEvent.click(minusButton); // Decrementa a 1
    });
    expect(screen.getByText(/Test Prod 1 - Cant: 1/)).toBeInTheDocument();
    expect(screen.getByTestId('total').textContent).toBe('Total: 1000');
  });

   it('no debería bajar la cantidad de 1', () => {
     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
     act(() => {
      fireEvent.click(addButton); // Añade Prod 1 (cantidad 1)
    });
    const minusButton = screen.getByText('-1');
     act(() => {
        fireEvent.click(minusButton); // Intenta decrementar
    });
    // La cantidad debería seguir siendo 1
    expect(screen.getByText(/Test Prod 1 - Cant: 1/)).toBeInTheDocument();
    expect(screen.getByTestId('total').textContent).toBe('Total: 1000');
  });

  it('debería eliminar un item del carrito', () => {
     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
     act(() => {
      fireEvent.click(addButton);
    });
    expect(screen.getByTestId('cart-items').children.length).toBe(1);

    const removeButton = screen.getByText('Remove');
     act(() => {
        fireEvent.click(removeButton);
    });
    expect(screen.getByTestId('cart-items').children.length).toBe(0);
    expect(screen.getByTestId('total').textContent).toBe('Total: 0');
  });

  it('debería vaciar el carrito', () => {
     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
     act(() => {
      fireEvent.click(screen.getByText('Add Prod 1'));
      fireEvent.click(screen.getByText('Add Prod 2 (Qty 2)'));
    });
    expect(screen.getByTestId('cart-items').children.length).toBe(2);

    const clearButton = screen.getByText('Clear Cart');
     act(() => {
        fireEvent.click(clearButton);
    });
    expect(screen.getByTestId('cart-items').children.length).toBe(0);
    expect(screen.getByTestId('total').textContent).toBe('Total: 0');
  });

  // PRUEBA DE STOCK (Ejemplo básico)
   it('no debería añadir más items que el stock disponible', () => {
    // Sobreescribimos el mock SÓLO para este test
    vi.mocked(productApi.getProductById).mockReturnValue({
        id: 1, name: 'Prod Stock Limitado', category: 'Test', price: '1000', stock: 1, imageUrl:'', description:''
    });

     render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    const addButton = screen.getByText('Add Prod 1');
     act(() => {
        fireEvent.click(addButton); // Añade 1 (OK)
    });
     expect(screen.getByText(/Test Prod 1 - Cant: 1/)).toBeInTheDocument();

     act(() => {
        fireEvent.click(addButton); // Intenta añadir otro (Debería fallar silenciosamente o mostrar warning en consola)
    });
     // La cantidad NO debería cambiar
     expect(screen.getByText(/Test Prod 1 - Cant: 1/)).toBeInTheDocument();
     expect(screen.getByTestId('total').textContent).toBe('Total: 1000'); // El total tampoco
   });

});