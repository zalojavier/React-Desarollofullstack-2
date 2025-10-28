import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import './CrearProducto.css';         // 2. Importamos el CSS nuevo

function CrearProducto() {

  // Manejador básico para el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario Crear Producto enviado');
    // Aquí iría la lógica para enviar los datos del producto
  };

  return (
    // 3. Estructura principal del layout de administrador
    <div className="admin-layout">
      
      {/* --- Menú lateral --- */}
      <aside className="sidebar-box">
        <div className="sidebar-logo">
          {/* 4. Corregimos ruta del logo y cerramos img */}
          <img src="/imagenesreact/pixel.png" alt="Logo Admin" />
          <span className="brand-name">Mi Tienda Pc gamer</span>
        </div>
        <nav className="menu">
          {/* 5. Cambiamos todos los <a> del menú por <Link> */}
          <Link to="/administrador/home" className="menu-item"><i className="bi bi-house"></i> <span>Inicio</span></Link>
          <Link to="/administrador/productos" className="menu-item"><i className="bi bi-box-seam"></i> <span>Productos</span></Link>
          <Link to="/administrador/usuarios" className="menu-item"><i className="bi bi-people"></i> <span>Usuarios</span></Link>
          <Link to="/administrador/pedidos" className="menu-item"><i className="bi bi-card-checklist"></i> <span>Pedidos</span></Link>
          {/* Links comentados se mantienen como comentarios JSX */}
          {/* <a href="#" className="menu-item"><i className="bi bi-bar-chart"></i> <span>Estadísticas</span></a> */}
          {/* <a href="#" className="menu-item"><i className="bi bi-gear"></i> <span>Ajustes</span></a> */}
          
          {/* El link de "Salir" podría ir a "/", o manejar lógica de logout */}
          <Link to="/" className="menu-item logout"><i className="bi bi-box-arrow-right"></i> <span>Salir</span></Link>
        </nav>
      </aside>

      {/* --- Contenido principal --- */}
      <main className="main-content">
        <div className="crear-producto-header">
          <h1><i className="bi bi-plus-circle"></i> Crear nuevo producto</h1>
          <Link to="/administrador/productos" className="volver-link"><i className="bi bi-arrow-left"></i> Volver al listado</Link>
        </div>
        
        <form className="crear-producto-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">Nombre del producto</label>
              {/* 6. Inputs y Textarea se auto-cierran */}
              <input type="text" id="nombre" name="nombre" className="form-control" required maxLength="80" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" name="categoria" className="form-control" required>
                <option value="">Seleccione categoría</option>
                <option value="Computadores">Computadores</option>
                <option value="Tarjetas de Video">Tarjetas de Video</option>
                <option value="Periféricos">Periféricos</option>
                <option value="Monitores">Monitores</option>
                <option value="Almacenamiento">Almacenamiento</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="precio">Precio ($ CLP)</label>
              <input type="number" id="precio" name="precio" className="form-control" required min="0" step="100" />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" className="form-control" required min="0" step="1" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group form-group-full">
              <label htmlFor="descripcion">Descripción</label>
              <textarea id="descripcion" name="descripcion" className="form-control" rows="3" maxLength="300" required></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group form-group-full">
              <label htmlFor="imagen">Imagen del producto</label>
              <input type="file" id="imagen" name="imagen" className="form-control" accept="image/*" required />
            </div>
          </div>
          <button type="submit" className="btn-crear-producto-form"><i className="bi bi-check-circle"></i> Crear producto</button>
        </form>
      </main>
    </div>
  );
}

export default CrearProducto;