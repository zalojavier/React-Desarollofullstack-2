import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'; 
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/crearUsuario.css'; 
import { createUser } from '../api/userApi';
import type { UserForm } from '../types/UserTypes'; 

export default function CrearUsuario() {
    
    // 2. Inicializamos el hook de navegación
    const navigate = useNavigate(); 
    
    const [formData, setFormData] = useState<UserForm>({
        nombre: '',
        correo: '', 
        rut: '',
        contrasena: '', 
        rol: 'Cliente' 
    });
    const [mensaje, setMensaje] = useState('');
    const [esError, setEsError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value as UserForm[keyof UserForm] 
        });
    };

 
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setMensaje('Creando usuario...');
        setEsError(false);

        // Llama a la API para guardar el usuario
        const success = createUser(formData);

        if (success) {
            setMensaje(`¡Usuario ${formData.nombre} creado con éxito! Redirigiendo...`);
            setEsError(false);
            
            setTimeout(() => {
                navigate('/administrador/usuarios'); 
            }, 1000); 
            
        } else {
            setMensaje('Error: El correo o RUT ya están registrados. Inténtalo de nuevo.');
            setEsError(true);
        }
    };

    return (
        <div className="admin-container">
            <SideBarAdmin />
            <div className="crear-usuario-content">
                <div className="crear-usuario-card">
                    <h2>Crear Nuevo Usuario</h2>
                    <form onSubmit={handleSubmit} className="crear-usuario-form">
                        
                        {/* ... Campos del formulario (Nombre, Correo, RUT, Contraseña, Rol) ... */}
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Completo:</label>
                            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rut">RUT (Ej: 11.111.111-1):</label>
                            <input type="text" id="rut" name="rut" value={formData.rut} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input type="password" id="contrasena" name="contrasena" value={formData.contrasena} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rol">Rol:</label>
                            <select id="rol" name="rol" value={formData.rol} onChange={handleChange}>
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        
                        {/* 4. El botón sigue siendo BUTTON type="submit" para activar handleSubmit */}
                        <button type="submit" className="submit-btn">
                            Crear Usuario
                        </button>
                    </form>
                    
                    {mensaje && (
                        <p className={`mensaje-feedback ${esError ? 'error-mensaje' : 'success-mensaje'}`}>
                            {mensaje}
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
}