import React, { useState, ChangeEvent, FormEvent } from 'react';
import SideBarAdmin from '../components/SideBarAdmin';
import '../styles/crearUsuario.css'; 
import { createUser } from '../api/userApi';
// Importamos solo UserForm, que es lo que sí exportas.
import type { UserForm } from '../types/UserTypes'; 

// Definimos el tipo de los roles localmente para tener un alias limpio para el casting,
// o simplemente usamos el tipo inferido de UserForm['rol']
type RoleType = UserForm['rol'];

const CrearUsuario: React.FC = () => {
    // 1. TIPADO: El estado inicial cumple con la interfaz UserForm.
    const [formData, setFormData] = useState<UserForm>({
        nombre: '',
        correo: '', 
        rut: '',
        contrasena: '', 
        // El valor inicial es un literal exacto: 'Cliente'
        rol: 'Cliente' 
    });
    const [mensaje, setMensaje] = useState('');
    const [esError, setEsError] = useState(false);

    /**
     * Maneja el cambio en cualquier campo del formulario, tipando el evento 'e'.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;
        
        // Si el campo es 'rol', lo casteamos al tipo RoleType (literal union)
        const newValue = name === 'rol' ? value as RoleType : value;

        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    /**
     * Maneja el envío del formulario, tipando el evento 'e'.
     */
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setMensaje('Creando usuario...');
        setEsError(false);

        // Llamamos a la función de la API. formData ya es del tipo correcto (UserForm).
        const success = createUser(formData);

        if (success) {
            setMensaje(`¡Usuario ${formData.nombre} creado con éxito!`);
            setEsError(false);
            
            // Resetea el formulario con valores del tipo literal correcto
            setFormData({ 
                nombre: '',
                correo: '',
                rut: '',
                contrasena: '',
                rol: 'Cliente' 
            });
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
                        
                        {/* Campo Nombre */}
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Completo:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre" 
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Campo Correo */}
                        <div className="form-group">
                            <label htmlFor="correo">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo" 
                                value={formData.correo}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Campo RUT */}
                        <div className="form-group">
                            <label htmlFor="rut">RUT (Ej: 11.111.111-1):</label>
                            <input
                                type="text"
                                id="rut"
                                name="rut" 
                                value={formData.rut}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña:</label>
                            <input
                                type="password"
                                id="contrasena"
                                name="contrasena" 
                                value={formData.contrasena}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        {/* Campo Rol */}
                        <div className="form-group">
                            <label htmlFor="rol">Rol:</label>
                            <select
                                id="rol"
                                name="rol" 
                                value={formData.rol}
                                onChange={handleChange}
                            >
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                        
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
};

export default CrearUsuario;