import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideBarAdmin() {
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className="sidebar-box" role="navigation" aria-label="Menú administrador">
      <div className="sidebar-logo">
        {}
        <img src="/imagenesreact/pixel.png" alt="Logo Admin" />
        <span className="brand-name">Mi Tienda Pc gamer</span>
      </div>

      <nav className="menu">
        <Link
          to="/administrador/home"
          className={`menu-item ${activePath === '/administrador/home' ? 'active' : ''}`}
        >
          <i className="bi bi-house" /> <span>Inicio</span>
        </Link>

        <Link
          to="/administrador/productos"
          className={`menu-item ${activePath === '/administrador/productos' ? 'active' : ''}`}
        >
          <i className="bi bi-box-seam" /> <span>Productos</span>
        </Link>

        <Link
          to="/administrador/usuarios"
          className={`menu-item ${activePath === '/administrador/usuarios' ? 'active' : ''}`}
        >
          <i className="bi bi-people" /> <span>Usuarios</span>
        </Link>

        <Link
          to="/administrador/pedidos"
          className={`menu-item ${activePath === '/administrador/pedidos' ? 'active' : ''}`}
        >
          <i className="bi bi-card-checklist" /> <span>Pedidos</span>
        </Link>

        <a href="/" className="menu-item logout">
          <i className="bi bi-box-arrow-right" /> <span>Salir</span>
        </a>
      </nav>
    </aside>
  );
}

export default SideBarAdmin;