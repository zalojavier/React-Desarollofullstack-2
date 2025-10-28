import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import { createUser } from '../api/userApi';
import type { UserForm } from '../types/UserTypes';


type InputElement = HTMLInputElement | HTMLSelectElement;

interface SignupFormState {
   
    nombre: string;
    correo: string;
    rut: string;
    contrasena: string;
    rol: 'Cliente' | 'Administrador';

    nombreCompleto: string;
    confirmCorreo: string;
    confirmContrasena: string;
    telefono: string;
    region: string; 
}

export default function Signup() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<SignupFormState>({
        
        nombre: '', 
        correo: '',
        rut: '00.000.000-0',
        contrasena: '',
        rol: 'Cliente',
        
       
        nombreCompleto: '', 
        confirmCorreo: '',
        confirmContrasena: '',
        telefono: '',
        region: '',
        
    });
    const [mensaje, setMensaje] = useState('');
    const [esError, setEsError] = useState(false);

    // Hook para manejar los estilos del <body> (se mantiene)
    useEffect(() => {
        document.body.classList.add('body-signup');
        return () => {
            document.body.classList.remove('body-signup');
        };
    }, []);

    // 2. Manejador de Cambios genérico
    const handleChange = (e: ChangeEvent<InputElement>): void => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    // 3. Manejador de Envío
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setMensaje('');
        setEsError(false);

        // --- VALIDACIONES ---
        if (formData.correo !== formData.confirmCorreo) {
            setMensaje('Error: Los correos electrónicos no coinciden.');
            setEsError(true);
            return;
        }
        if (formData.contrasena !== formData.confirmContrasena) {
            setMensaje('Error: Las contraseñas no coinciden.');
            setEsError(true);
            return;
        }
        if (formData.nombreCompleto.trim() === '') {
             setMensaje('Error: Debe ingresar su nombre completo.');
             setEsError(true);
             return;
        }

        // --- PREPARAR DATOS PARA LA API (Mapeo a UserForm) ---
        const userToCreate: UserForm = {
            nombre: formData.nombreCompleto.trim(), 
            correo: formData.correo,
            rut: formData.rut, 
            contrasena: formData.contrasena,
            rol: 'Cliente',
        };

        // --- LLAMADA A LA API ---
        const success = createUser(userToCreate);
        
        if (success) {
            setMensaje('Registro exitoso. Serás redirigido a la tienda principal.');
            setEsError(false);
            
            setTimeout(() => {
                navigate('/'); // Redirigir a la página de inicio
            }, 1000);

        } else {
            setMensaje('Error al registrar usuario. El correo ya puede estar en uso.');
            setEsError(true);
        }
    };

    return (
        <main className="signup-container">
            <div className="signup-brand">
                <img src="/imagenesreact/pixel.png" alt="Logo Gamer Tienda de Computadoras" />
                <span className="brand-name">Mi Tienda Pc gamer</span>
            </div>
            <h1 className="signup-title">Regístrate</h1>
            
            <form id="form-registro" onSubmit={handleSubmit}>
                {mensaje && (
                    <p className={`mensaje-feedback ${esError ? 'error-mensaje' : 'success-mensaje'}`} style={{ marginBottom: 15 }}>
                        {mensaje}
                    </p>
                )}

                {/* Campos de Nombre, Correo, Contraseña, Teléfono (sin cambios) */}
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nombre Completo" 
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    required 
                />
                
                <input 
                    type="email" 
                    className="form-control"
                    placeholder="Correo electrónico" 
                    name="correo" 
                    maxLength={100} 
                    pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$" 
                    value={formData.correo}
                    onChange={handleChange}
                    required 
                />
                <div className="error-message" id="error-email"></div>
                
                <input 
                    type="email" 
                    className="form-control"
                    placeholder="Confirme Correo electrónico"
                    name="confirmCorreo"
                    maxLength={100}
                    pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$"
                    value={formData.confirmCorreo}
                    onChange={handleChange}
                    required 
                />
                <div className="error-message" id="error-email2"></div>

                <input 
                    type="password" 
                    className="form-control"
                    placeholder="Contraseña"
                    name="contrasena"
                    minLength={4}
                    maxLength={10}
                    value={formData.contrasena}
                    onChange={handleChange}
                    required 
                />
                <div className="error-message" id="error-password"></div>

                <input 
                    type="password" 
                    className="form-control"
                    placeholder="Confirme Contraseña"
                    name="confirmContrasena"
                    minLength={4}
                    maxLength={10}
                    value={formData.confirmContrasena}
                    onChange={handleChange}
                    required 
                />
                <div className="error-message" id="error-password2"></div>
                
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Numero de Telefono (Opcional)" 
                    name="telefono"
                    inputMode="numeric" 
                    pattern="[0-9]{9}" 
                    minLength={9} 
                    maxLength={9} 
                    value={formData.telefono}
                    onChange={handleChange}
                />

                {/* 4. Selects: Solo queda el Select de Región, ocupando todo el ancho */}
                <div className="select-row" style={{ width: '100%' }}>
                    <select 
                        className="form-control" 
                        name="region" 
                        value={formData.region}
                        onChange={handleChange}
                        required
                        style={{ width: '100%' }} // Aseguramos que ocupe todo el espacio
                    >
                        <option value="" disabled>Seleccione Región</option>
                        <option value="Arica y Parinacota">Arica y Parinacota</option>
                        <option value="Tarapacá">Tarapacá</option>
                        {/* ... (Todas las demás regiones) ... */}
                        <option value="Magallanes">Magallanes y de la Antártica Chilena</option>
                    </select>
                    
                    {/* ❌ SELECT DE COMUNA ELIMINADO */}
                </div>

                <button type="submit" className="btn-sign-up">
                    <i className="bi bi-person-plus"></i> Registrarse
                </button>
            </form>
            
            <div className="sign-up-to-sign-in">
                <p className="cuenta">¿Ya tienes cuenta?</p>
                <Link to="/login" className="red-sign-in">Ingresar</Link>
            </div>
        </main>
    );
}