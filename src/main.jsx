import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/cartContex.jsx';
import { seedUsers } from './api/userApi.ts';
import { seedProducts } from './api/productApi.ts';

// --- Datos de prueba (semillas) ---
seedUsers();
seedProducts();

// --- Estilos (importados globalmente) ---
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'; // ¡Tu CSS principal!

// --- Páginas ---
import Home from './pages/Home.jsx';
import BlogJuegosRetro from './pages/BlogJuegosRetro.jsx';
import BlogArmarPc from './pages/BlogArmarPc.jsx';
import Categorias from './pages/Categorias.jsx';
import SeccionJuegosMesa from './pages/SeccionJuegosMesa.jsx';
import CartPage from './pages/Carrito.tsx';
import HomeAdministrador from './pages/HomeAdministrador.jsx';
import ListaProductos from './pages/ListaProductos.jsx';
import ListaUsuarios from './pages/ListaUsuarios.jsx';
import ListaPedidos from './pages/ListaPedidos.jsx';
 // <-- 1. IMPORTA LA NUEVA PÁGINA

// --- Definición de Rutas (El "Mapa" del sitio) ---
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  
  // --- Páginas de Blog ---
  { path: "/blog/juegos-retro", element: <BlogJuegosRetro /> },
  { path: "/blog/armar-pc", element: <BlogArmarPc /> },

  // --- Página de Categorías ---
  { path: "/categorias", element: <Categorias /> },

  // --- NUEVAS RUTAS DE SECCIONES ---
  {
    path: "/secciones/juegosdemesa",
    element: <SeccionJuegosMesa />, // <-- 2. ACTUALIZA ESTA LÍNEA
  },
  { path: "/secciones/accesorios", element: <div>Página de Accesorios (Próximamente)</div> },
  { path: "/secciones/consolas", element: <div>Página de Consolas (Próximamente)</div> },
  { path: "/secciones/pcdeescritorio", element: <div>Página de PCs de Escritorio (Próximamente)</div> },
  { path: "/secciones/sillasgamers", element: <div>Página de Sillas Gamers (Próximamente)</div> },
  { path: "/secciones/mousepad", element: <div>Página de Mousepads (Próximamente)</div> },
  { path: "/secciones/poleraspersonalizadas", element: <div>Página de Poleras (Próximamente)</div> },
  
  // --- Páginas de Productos (Próximamente) ---
  { path: "/productos/audifonos", element: <div>Página de Audífonos (Próximamente)</div> },
  { path: "/productos/pc-gamer-elite", element: <div>Página de PC Gamer Elite (Próximamente)</div> },
  { path: "/productos/control-xbox", element: <div>Página de Control Xbox (Próximamente)</div> },
  { path: "/productos/mouse-logitech", element: <div>Página de Mouse Logitech (Próximamente)</div> },
  
  // 3. AÑADIMOS LAS NUEVAS PÁGINAS DE PRODUCTOS
  {
    path: "/productos/catan",
    element: <div>Página del Producto: Catan (Próximamente)</div>,
  },
  {
    path: "/productos/carcassonne",
    element: <div>Página del Producto: Carcassonne (Próximamente)</div>,
  },

  //4. Página del Carrito
  {
    path: "/carrito", element: <CartPage />,
  },

  // --- NUEVAS RUTAS DE ADMINISTRADOR --- 
  {
    path: "/administrador/home", 
    element: <HomeAdministrador />, // <-- RUTA NUEVA
  },
  {
    path: "/administrador/productos",
    element: <ListaProductos />, // <-- RUTA NUEVA
  },
  {
    path: "/administrador/usuarios",
    element: <ListaUsuarios />, // <-- RUTA NUEVA
  },
  {
    path: "/administrador/pedidos",
    element: <ListaPedidos />,
  },
]);

// --- Carga de la App ---
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* El CartProvider envuelve TODO el sistema de rutas para que todas las páginas accedan al carrito */}
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
)