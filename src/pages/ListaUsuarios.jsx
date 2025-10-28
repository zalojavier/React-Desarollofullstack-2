import React from 'react';
import SideBarAdmin from '../components/SideBarAdmin';
import { Link } from 'react-router-dom';
import '../styles/listaUsuarios.css';

/**
 * Página presentacional de lista de usuarios.
 * - Reutiliza SideBarAdmin (react-router Link inside).
 * - Solo UI: demo data, no persistencia ni llamadas a API.
 */
export default function ListaUsuarios() {
  const demoUsers = [
    {
      id: 1,
      avatar: '/imagenes/avatar_admin.png',
      nombre: 'Ana Fernández',
      email: 'ana@mitienda.cl',
      rol: 'Administrador',
      estado: 'activo',
    },
    {
      id: 2,
      avatar: '/imagenes/avatar_cliente.png',
      nombre: 'Carlos Soto',
      email: 'carlos@gmail.com',
      rol: 'Cliente',
      estado: 'activo',
    },
    {
      id: 3,
      avatar: '/imagenes/avatar_cliente.png',
      nombre: 'Valeria Ruiz',
      email: 'valeria@duoc.cl',
      rol: 'Cliente',
      estado: 'inactivo',
    },
  ];

  return (
    <div className="admin-layout">
      <SideBarAdmin />

      <main className="main-content">
        <div className="usuarios-header">
          <h1>Usuarios</h1>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link
              className="btn-crear-usuario"
              to="/administrador/crear_usuario" // Usamos 'to' en lugar de 'href'
            >
              <i className="bi bi-person-plus" /> Crear usuario
            </Link>
          </div>
        </div>

        <div className="usuarios-table-wrapper">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <img src={user.avatar} alt={user.nombre} className="usuario-avatar" />
                  </td>
                  <td>{user.nombre}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>
                    <span className={`estado ${user.estado === 'activo' ? 'activo' : 'inactivo'}`}>
                      {user.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-editar-usuario" type="button">
                      <i className="bi bi-pencil" /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}