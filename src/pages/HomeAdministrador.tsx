import React, { useEffect, useState } from 'react';
import SideBarAdmin from '../components/SideBarAdmin.jsx';
import '../styles/HomeAdministrador.css';

import {getProductCount } from '../api/productApi';
import { getUserCount } from '../api/userApi'; 

function HomeAdministrador() {
  const [productCount, setProductCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
  

    try {
      setProductCount(typeof getProductCount === 'function' ? getProductCount() : 0);

      setUserCount(typeof getUserCount === 'function' ? getUserCount() : 0);
      
    } catch (error) {
      console.error("Error al cargar conteos:", error);
    }
  }, []);

  return (
    <div className="admin-layout">
      <SideBarAdmin />

      <main className="main-content">
        <h1>Bienvenido, Administrador</h1>
        <p>Selecciona una opción del menú para comenzar a gestionar la tienda.</p>

        <div className="admin-widgets">
          <div className="widget">
            <i className="bi bi-box-seam"></i>
            <div>
              <span className="widget-title">Productos</span>
              <span className="widget-value">{productCount}</span>
            </div>
          </div>

          <div className="widget">
            <i className="bi bi-people"></i>
            <div>
              <span className="widget-title">Usuarios</span>
              <span className="widget-value">{userCount}</span>
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
