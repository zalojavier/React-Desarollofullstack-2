import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/listaUsuarios.css';
import { loadAndSeedUsers } from '../api/userApi'; 
import type { User } from '../types/UserTypes'; 


export default function ListaUsuarios() {
    
    const [users, setUsers] = useState<User[]>([]); 


    useEffect(() => {

        const storedUsers: User[] = loadAndSeedUsers();
        
        // Asignamos la lista cargada al estado
        setUsers(storedUsers);
    }, []);

    // Helper para determinar el estado visual
    const getUserStatus = (user: User): 'activo' | 'inactivo' => {
        if (user.rut && user.correo && user.rol) {
            return 'activo';
        }
        return 'inactivo';
    };

    return (
        <div className="admin-layout">
            <SideBarAdmin />

            <main className="main-content">
                <div className="usuarios-header">
                    <h1>Usuarios</h1>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <Link
                            className="btn-crear-usuario"
                            to="/administrador/crear_usuario"
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
                            {}
                            {users.map(user => {
                                const status = getUserStatus(user); 
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            <img src={user.avatarUrl} alt={user.nombre} className="usuario-avatar" />
                                        </td>
                                        <td>{user.nombre}</td>
                                        {/* Usamos user.correo (la propiedad correcta del tipo User) */}
                                        <td>{user.correo}</td> 
                                        <td>{user.rol}</td>
                                        <td>
                                            <span className={`estado ${status === 'activo' ? 'activo' : 'inactivo'}`}>
                                                {status === 'activo' ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-editar-usuario" type="button">
                                                <i className="bi bi-pencil" /> Editar
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Mensaje si la lista está vacía */}
                            {users.length === 0 && (
                                <tr><td colSpan={7} style={{textAlign: 'center', padding: '15px'}}>Cargando o no hay usuarios registrados.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}