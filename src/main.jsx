import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './context/cartContex.jsx';

// --- Datos de prueba (semillas) ---


// --- Estilos (importados globalmente) ---
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'; // ¡Tu CSS principal!

// --- Páginas ---
import Home from './pages/Home.jsx';
import BlogJuegosRetro from './pages/BlogJuegosRetro.jsx';
import BlogArmarPc from './pages/BlogArmarPc.jsx';
import Categorias from './pages/Categorias.jsx';
import CategorySection from './pages/SeccionProductos.tsx';
import CartPage from './pages/Carrito.tsx';
import HomeAdministrador from './pages/HomeAdministrador';
import ListaProductos from './pages/ListaProductos';
import ListaUsuarios from './pages/ListaUsuarios';
import ListaPedidos from './pages/ListaPedidos';
import CrearUsuario from './pages/CrearUsuario'; // Verifica la extensión (.jsx o .tsx)
import Login from './pages/Login.tsx';
import CrearProducto from './pages/CrearProducto.tsx';
import Signup from './pages/Signup.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx'; // <-- 1. IMPORTA LA NUEVA PÁGINA (NUEVO)

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
{ path:"/secciones/juegosdemesa", element: <CategorySection />},
{ path: "/secciones/accesorios", element: <CategorySection /> },
{ path: "/secciones/consolas", element: <CategorySection /> }, 
{ path: "/secciones/pcdeescritorio", element: <CategorySection /> }, 
{ path: "/secciones/sillasgamers", element: <CategorySection /> }, 
{ path: "/secciones/mousepad", element: <CategorySection /> }, 
{ path: "/secciones/poleraspersonalizadas", element: <CategorySection /> }, 
{ path: "/productos/:id", element: <ProductDetailPage /> },
  // --- Páginas de Productos (Próximamente) ---
  { path: "/productos/audifonos", element: <div>Página de Audífonos (Próximamente)</div> },
  { path: "/productos/pc-gamer-elite", element: <div>Página de PC Gamer Elite (Próximamente)</div> },
  { path: "/productos/control-xbox", element: <div>Página de Control Xbox (Próximamente)</div> },
  { path: "/productos/mouse-logitech", element: <div>Página de Mouse Logitech (Próximamente)</div> },
  { path: "/productos/catan", element: <div>Página del Producto: Catan (Próximamente)</div> },
  { path: "/productos/carcassonne", element: <div>Página del Producto: Carcassonne (Próximamente)</div> },

  //4. Página del Carrito
  {
    path: "/carrito", element: <CartPage />,
  },

  // --- NUEVAS RUTAS DE ADMINISTRADOR ---
  { path: "/administrador/home", element: <HomeAdministrador /> },
  { path: "/administrador/productos", element: <ListaProductos /> },
  { path: "/administrador/usuarios", element: <ListaUsuarios /> },
  { path: "/administrador/pedidos", element: <ListaPedidos /> },
  {
    path: "/administrador/crear_producto",
    element: <CrearProducto />,
  },
  {
    path: "/administrador/crear_usuario",
    element: <CrearUsuario />,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registrarse",
    element: <Signup />, 
  },
  {
    path: "/restablecer-password",
    element: <div>Página de Restablecer Contraseña (Próximamente)</div>,
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