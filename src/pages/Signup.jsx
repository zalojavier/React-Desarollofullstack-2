import React, { useEffect } from 'react'; // 1. Importamos useEffect
import { Link } from 'react-router-dom';
import './Signup.css'; // 2. Importamos el CSS nuevo

function Signup() {

  // 3. Hook para manejar los estilos del <body>
  useEffect(() => {
    document.body.classList.add('body-signup'); // Añade la clase al entrar
    return () => {
      document.body.classList.remove('body-signup'); // Quita la clase al salir
    };
  }, []); // El [] asegura que solo se ejecute una vez al montar/desmontar

  // 4. Manejador básico del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario de Registro enviado');
    // La lógica de tus archivos .js (validación, etc.) iría aquí, usando estado de React (useState)
  };

  return (
    // 5. Contenido del <body> traducido a JSX
    <main className="signup-container">
      <div className="signup-brand">
        {/* 6. Corregimos ruta logo y cerramos img */}
        <img src="/imagenesreact/pixel.png" alt="Logo Gamer Tienda de Computadoras" />
        <span className="brand-name">Mi Tienda Pc gamer</span>
      </div>
      <h1 className="signup-title">Regístrate</h1>
      
      <form id="form-registro" onSubmit={handleSubmit}>
        
        {/* 7. Inputs se auto-cierran */}
        <input type="text" className="form-control" placeholder="Nombre Completo" required />
        <input type="email" className="form-control"
          placeholder="Correo electrónico" id="email" maxLength="100" pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$" required />
        <div className="error-message" id="error-email"></div>
        <input type="email" className="form-control"
               placeholder="Confirme Correo electrónico"
               id="email2"
               maxLength="100"
               pattern="^([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$"
               required />
        <div className="error-message" id="error-email2"></div>

        <input type="password" className="form-control"
               placeholder="Contraseña"
               id="password"
               minLength="4"
               maxLength="10"
               required />
        <div className="error-message" id="error-password"></div>

        <input type="password" className="form-control"
               placeholder="Confirme Contraseña"
               id="password2"
               minLength="4"
               maxLength="10"
               required />
        <div className="error-message" id="error-password2"></div>
        <input type="text" className="form-control" placeholder="Numero de Telefono (Opcional)" inputMode="numeric" pattern="[0-9]{9}" minLength="9" maxLength="9" />

        <div className="select-row">
          <select className="form-control" id="region" name="region" required>
            <option value="">Seleccione Región</option>
            <option value="Arica y Parinacota">Arica y Parinacota</option>
            <option value="Tarapacá">Tarapacá</option>
            {/* ... (Todas las demás regiones) ... */}
             <option value="Magallanes">Magallanes y de la Antártica Chilena</option>
          </select>
          {/* El <script> para las comunas NO FUNCIONA en React.
              Esta lógica debe hacerse con estado (useState) y llamadas a API o datos locales */}

          <select className="form-control" id="comuna" name="comuna" required>
            <option value="">Seleccione Comuna</option>
             {/* Las comunas se cargarían dinámicamente aquí */}
          </select>
        </div>

        <button type="submit" className="btn-sign-up">
          <i className="bi bi-person-plus"></i> Registrarse
        </button>
      </form>
      <div className="sign-up-to-sign-in">
        <p className="cuenta">¿Ya tienes cuenta?</p>
        {/* 8. Link a login.html se cambia por Link a /login */}
        <Link to="/login" className="red-sign-in">Ingresar</Link>
      </div>
    </main>
  );
}

export default Signup; // 9. No olvides exportar!