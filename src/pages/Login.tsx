import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { loadAndSeedUsers } from '../api/userApi';
import type { User } from '../types/UserTypes'; 

type InputElement = HTMLInputElement;

export default function Login() {
    const navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({
        correo: '',
        contrasena: '',
    });
    const [mensaje, setMensaje] = useState('');
    const [esError, setEsError] = useState(false);

    useEffect(() => {
        document.body.classList.add('body-login');
        return () => {
            document.body.classList.remove('body-login');
        };
    }, []);

    const handleChange = (e: ChangeEvent<InputElement>): void => {
        const { name, value } = e.target;
        
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        setMensaje('Iniciando sesión...');
        setEsError(false);

        const users: User[] = loadAndSeedUsers(); 

        const foundUser = users.find(user => 
            user.correo.toLowerCase() === credentials.correo.toLowerCase() &&
            user.contrasena === credentials.contrasena
        );

        if (foundUser) {
            setMensaje(`¡Bienvenido, ${foundUser.nombre}!`);
            
 
            setTimeout(() => {
                if (foundUser.rol === 'Administrador') {
                    navigate('/administrador/home'); 
                } else if (foundUser.rol === 'Cliente') {
                    navigate('/'); 
                }
            }, 500);

        } else {
            setMensaje('Error: Correo o Contraseña incorrectos.');
            setEsError(true);
        }
    };

    return (
        <main className="login-container">
            <div className="login-brand">
                <img src="/imagenesreact/pixel.png" alt="Logo Gamer Tienda de Computadoras" />
                <span className="brand-name">Mi Tienda Pc gamer</span>
            </div>
            <h1 className="login-title">Iniciar Sesión</h1>
            
            <form id="form-login" onSubmit={handleSubmit}>
                {mensaje && (
                    <p className={`mensaje-feedback ${esError ? 'error-mensaje' : 'success-mensaje'}`} style={{ marginBottom: 15 }}>
                        {mensaje}
                    </p>
                )}

                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Correo electrónico" 
                    name="correo"
                    maxLength={100} 
                    pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$" 
                    value={credentials.correo}
                    onChange={handleChange}
                    required 
                    autoFocus 
                />
                <div className="error-message" id="error-email-no"></div>
                
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Contraseña" 
                    name="contrasena"
                    minLength={4} 
                    maxLength={10} 
                    value={credentials.contrasena}
                    onChange={handleChange}
                    required 
                />
                
                <Link to="/restablecer-password" className="rest-password">¿Olvidaste tu contraseña?</Link>
                
                <button type="submit" className="btn-sign-in">
                    <i className="bi bi-box-arrow-in-right"></i> Ingresar
                </button>
            </form>
            
            <div className="sign-in-to-sign-up">
                <p className="cuenta">¿No tienes una cuenta?</p>
                <Link to="/registrarse" className="red-sign-up">Regístrate</Link>
            </div>
        </main>
    );
}