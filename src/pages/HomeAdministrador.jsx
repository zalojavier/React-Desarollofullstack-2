import React from 'react';
import SideBarAdmin from '../components/SideBarAdmin'; // importa el componente
import '../styles/HomeAdministrador.css'; // importa los estilos (copiar el CSS al archivo indicado)

/**
 * Página principal del panel administrativo (visual).
 * Asegúrate que esta página esté envuelta por <BrowserRouter> en tu app para que useLocation y Link funcionen.
 */
function HomeAdministrador() {
  return (
    <div className="admin-layout">
      <SideBarAdmin />

      {/* Contenido principal */}
      <main className="main-content">
        <h1>Bienvenido, Administrador</h1>
        <p>Selecciona una opción del menú para comenzar a gestionar la tienda.</p>

        <div className="admin-widgets">
          <div className="widget">
            <i className="bi bi-box-seam"></i>
            <div>
              <span className="widget-title">Productos</span>
              <span className="widget-value">125</span>
            </div>
          </div>

          <div className="widget">
            <i className="bi bi-people"></i>
            <div>
              <span className="widget-title">Usuarios</span>
              <span className="widget-value">320</span>
            </div>
          </div>

          <div className="widget">
            <i className="bi bi-card-checklist"></i>
            <div>
              <span className="widget-title">Pedidos</span>
              <span className="widget-value">58</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomeAdministrador;