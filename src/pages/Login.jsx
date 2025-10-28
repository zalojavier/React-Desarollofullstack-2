import React, { useEffect } from 'react'; // 1. Importamos 'useEffect'
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Asegúrate de tener los estilos adecuados

function Login() {

  // 2. Este "hook" maneja los estilos del <body>
  useEffect(() => {
    // Cuando esta página carga, añade la clase .body-login al <body>
    document.body.classList.add('body-login');

    // Esta función de "limpieza" se ejecuta cuando sales de la página
    return () => {
      // Quita la clase .body-login del <body>
      document.body.classList.remove('body-login');
    };
  }, []); // El [] vacío asegura que esto solo se ejecute al cargar y limpiar

  // 3. Manejador de formulario para React
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue
    console.log('Formulario enviado. Aquí va la lógica de login.');
  };

  return (
    <main className="login-container">
      <div className="login-brand">
        <img src="/imagenesreact/pixel.png" alt="Logo Gamer Tienda de Computadoras" />
        <span className="brand-name">Mi Tienda Pc gamer</span>
      </div>
      <h1 className="login-title">Iniciar Sesión</h1>
      
      <form id="form-login" onSubmit={handleSubmit}>
        
        <input type="text" className="form-control" placeholder="Nombre Completo" />
        <input type="email" className="form-control" placeholder="Correo electrónico" maxLength="100" pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$" required autoFocus />
        <div className="error-message" id="error-email-no"></div>
        <input type="password" className="form-control" placeholder="Contraseña" minLength="4" maxLength="10" required />
        
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

export default Login;