import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necesario porque Navbar usa <Link>
import Navbar from './Navbar';
import { describe, it, expect } from 'vitest'; // Funciones de Vitest

// Describe agrupa un conjunto de pruebas relacionadas
describe('Componente Navbar', () => {

  // 'it' define una prueba individual
  it('debería mostrar el nombre de la tienda', () => {
    // 1. Renderiza el componente Navbar dentro de un BrowserRouter
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // 2. Busca el elemento que contiene el texto "Mi Tienda Pc gamer"
    //    screen.getByText busca texto visible en la página
    //    La 'i' al final hace que ignore mayúsculas/minúsculas
    const brandElement = screen.getByText(/Mi Tienda Pc gamer/i);

    // 3. Verifica que el elemento encontrado esté realmente en el documento (página)
    expect(brandElement).toBeInTheDocument();
  });

  it('debería tener un link para iniciar sesión que apunte a /login', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Busca un elemento que sea un link (role: 'link')
    // y que tenga el texto "Iniciar sesión"
    const loginLink = screen.getByRole('link', { name: /Iniciar sesión/i });

    // Verifica que el link exista
    expect(loginLink).toBeInTheDocument();
    // Verifica que el atributo 'href' del link sea exactamente '/login'
    expect(loginLink).toHaveAttribute('href', '/login');
  });

});