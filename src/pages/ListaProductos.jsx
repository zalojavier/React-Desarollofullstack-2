import React, { useState } from 'react';
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/listaProductos.css';

/**
 * ListaProductos - página visual mejorada
 * - Panel que contiene la tabla (cuadrado)
 * - Botón Crear producto mejorado (dropdown + modal visual)
 * - Botón Crear usuario personalizado (acción demo)
 * - Toggle Tabla / Tablero (mantengo tabla como vista por defecto)
 */
export default function ListaProductos() {
  const demoProducts = [
    {
      id: 1,
      img: '/imagenes/ejemplo_pc1.jpg',
      nombre: 'PC Gamer Ultimate',
      categoria: 'Computadores',
      precio: '$1.200.000',
      stock: 10,
    },
    {
      id: 2,
      img: '/imagenes/ejemplo_gpu1.jpg',
      nombre: 'NVIDIA RTX 4080',
      categoria: 'Tarjetas de Video',
      precio: '$950.000',
      stock: 6,
    },
    {
      id: 3,
      img: '/imagenes/ejemplo_mouse1.jpg',
      nombre: 'Mouse Gamer RGB',
      categoria: 'Periféricos',
      precio: '$35.000',
      stock: 42,
    },
  ];

  const [view, setView] = useState('tabla'); // 'tabla' | 'tablero'
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="admin-layout">
      <SideBarAdmin />

      <main className="main-content">
        <div className="productos-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1>Productos</h1>

            <div className="view-controls" role="tablist" aria-label="Vista productos">
              <button
                type="button"
                className={`toggle-btn ${view === 'tabla' ? 'active' : ''}`}
                onClick={() => setView('tabla')}
                aria-pressed={view === 'tabla'}
              >
                <i className="bi bi-table" /> Tabla
              </button>
              <button
                type="button"
                className={`toggle-btn ${view === 'tablero' ? 'active' : ''}`}
                onClick={() => setView('tablero')}
                aria-pressed={view === 'tablero'}
              >
                <i className="bi bi-grid-3x3-gap" /> Tablero
              </button>
            </div>
          </div>

          <div className="create-area" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Botón crear usuario (personalizado) */}
            <button
              className="btn-crear-usuario"
              type="button"
              onClick={() => alert('Abrir formulario Crear Usuario (demo)')}
              title="Crear nuevo usuario"
            >
              <i className="bi bi-person-plus" /> Crear usuario
            </button>

            {/* Botón crear producto con dropdown */}
            <div className="create-wrapper">
              <button
                className="btn-crear-producto"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <i className="bi bi-plus-circle" /> Crear producto
                <i className={`bi ${dropdownOpen ? 'bi-caret-up-fill' : 'bi-caret-down-fill'}`} style={{ marginLeft: 6 }} />
              </button>

              {dropdownOpen && (
                <div className="create-dropdown" role="menu">
                  <button className="create-dropdown-item" type="button" onClick={() => { setModalOpen(true); setDropdownOpen(false); }}>
                    <i className="bi bi-file-earmark-plus" /> Nuevo producto
                  </button>
                  <button className="create-dropdown-item" type="button" onClick={() => { setDropdownOpen(false); alert('Importar CSV (demo)'); }}>
                    <i className="bi bi-file-arrow-up" /> Importar CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Panel (cuadrado) que contiene la tabla o tablero */}
        <div className="panel-box">
          {/* VISTA: TABLA */}
          {view === 'tabla' && (
            <div className="productos-table-wrapper">
              <table className="productos-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {demoProducts.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td><img src={p.img} alt={p.nombre} className="producto-img" /></td>
                      <td>{p.nombre}</td>
                      <td>{p.categoria}</td>
                      <td>{p.precio}</td>
                      <td>{p.stock}</td>
                      <td>
                        <button className="btn-editar-producto" type="button">
                          <i className="bi bi-pencil" /> Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VISTA: TABLERO / CARDS */}
          {view === 'tablero' && (
            <div className="product-board" style={{ padding: 18 }}>
              {/* Reuso las tarjetas (simplificadas aquí) */}
              {demoProducts.map((p) => (
                <article className="product-card" key={p.id}>
                  <div className="product-card-media">
                    <img src={p.img} alt={p.nombre} />
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-title">{p.nombre}</h3>
                    <p className="product-card-category">{p.categoria}</p>
                    <div className="product-card-meta">
                      <span className="product-price">{p.precio}</span>
                      <span className="product-stock">{p.stock} en stock</span>
                    </div>
                  </div>
                  <div className="product-card-actions">
                    <button className="btn-editar-producto small"><i className="bi bi-pencil" /> Editar</button>
                    <button className="btn-editar-producto small remove"><i className="bi bi-trash" /> Eliminar</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* MODAL VISUAL PARA CREAR PRODUCTO (solo UI, demo) */}
        {modalOpen && (
          <div className="modal-backdrop" role="dialog" aria-modal="true">
            <div className="modal-card">
              <header className="modal-header">
                <h2>Crear producto (demo)</h2>
                <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Cerrar">&times;</button>
              </header>

              <div className="modal-body">
                <label>
                  Nombre
                  <input type="text" placeholder="Nombre del producto" />
                </label>

                <label>
                  Categoría
                  <input type="text" placeholder="Categoría" />
                </label>

                <label>
                  Precio
                  <input type="text" placeholder="$0" />
                </label>

                <label>
                  Stock
                  <input type="number" min="0" defaultValue={0} />
                </label>
              </div>

              <footer className="modal-footer">
                <button className="btn-crear-producto ghost" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button className="btn-crear-producto" onClick={() => { alert('Simulación: producto creado (demo)'); setModalOpen(false); }}>Crear (demo)</button>
              </footer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}