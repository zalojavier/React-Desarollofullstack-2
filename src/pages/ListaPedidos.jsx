import React, { useState } from 'react';
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/listaPedidos.css';

/**
 * ListaPedidos - página presentacional + pequeña interactividad (filtro + acciones demo)
 * - Reutiliza SideBarAdmin como solicitaste.
 * - Filtro por estado (client-side, visual).
 * - Acciones "Cerrar" y "Anular" que actualizan el estado en memoria (demo).
 *
 * Esta versión está pensada para integrarse en un app React con react-router (SideBarAdmin usa useLocation).
 */
export default function ListaPedidos() {
  const initialOrders = [
    { id: '#1001', fecha: '2025-09-06', cliente: 'Ana Fernández', email: 'ana@mitienda.cl', total: '$1.230.000', estado: 'pendiente' },
    { id: '#1000', fecha: '2025-09-04', cliente: 'Carlos Soto', email: 'carlos@gmail.com', total: '$120.000', estado: 'completado' },
    { id: '#1002', fecha: '2025-09-07', cliente: 'Valeria Ruiz', email: 'valeria@duoc.cl', total: '$320.000', estado: 'pendiente' },
    { id: '#0999', fecha: '2025-09-03', cliente: 'Mario Pérez', email: 'mario@mail.com', total: '$56.000', estado: 'completado' },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState('todos');

  const filtered = orders.filter(o => filter === 'todos' ? true : o.estado === filter);

  const handleCloseOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, estado: 'completado' } : o));
  };

  const handleCancelOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="admin-layout">
      <SideBarAdmin />

      <main className="main-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h1><i className="bi bi-card-checklist" style={{ marginRight: 8 }} /> Pedidos</h1>
        </div>

        <div className="filtro-pedidos">
          <label htmlFor="filtroEstado"><i className="bi bi-funnel"></i> Filtrar por estado:</label>
          <select
            id="filtroEstado"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filtrar pedidos por estado"
          >
            <option value="todos">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
        </div>

        <div className="usuarios-table-wrapper">
          <table className="usuarios-table" role="table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '18px 0' }}>No hay pedidos.</td>
                </tr>
              ) : (
                filtered.map(order => (
                  <tr key={order.id} className="pedido-row" data-estado={order.estado}>
                    <td>{order.id}</td>
                    <td>{order.fecha}</td>
                    <td>{order.cliente}</td>
                    <td>{order.email}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`estado-pedido ${order.estado === 'pendiente' ? 'estado-pendiente' : 'estado-completado'}`}>
                        {order.estado === 'pendiente' ? 'Pendiente' : 'Completado'}
                      </span>
                    </td>
                    <td className="acciones">
                      {order.estado === 'pendiente' && (
                        <button
                          className="btn-cerrar-pedido"
                          type="button"
                          onClick={() => handleCloseOrder(order.id)}
                          title="Marcar como completado"
                        >
                          <i className="bi bi-check2" /> Cerrar
                        </button>
                      )}
                      <button
                        className="btn-anular-pedido"
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        title="Anular pedido"
                      >
                        <i className="bi bi-x-lg" /> Anular
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}