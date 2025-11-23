import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // Agregamos 'minHeight' para asegurar que la barra tenga cuerpo
    <nav className="navbar navbar-dark bg-dark shadow-sm" style={{ minHeight: '80px' }}>
      
      <div className="container-fluid position-relative w-100">
        
        {/* === 1. LOGO CENTRADO (La solución definitiva) === */}
        {/* 'position-absolute top-50 start-50 translate-middle': Esto lo clava en el centro exacto */}
        <Link 
          className="navbar-brand position-absolute top-50 start-50 translate-middle d-flex align-items-center gap-3 m-0" 
          to="/"
        >
          <img
            src="/imagenesreact/pixel.png"
            alt="Logo"
            className="navbar-logo-img"
          />
          {/* Texto visible y de buen tamaño */}
          <span className="fw-bold fs-3 d-none d-md-block">Mi Tienda Pc gamer</span>
        </Link>

        {/* === 2. BOTÓN LOGIN (A la derecha) === */}
        {/* 'translate-middle-y': Lo centra verticalmente */}
        <div className="position-absolute top-50 end-0 translate-middle-y me-4">
          <Link to="/login" className="btn btn-login">
            <i className="bi bi-person me-2"></i> Iniciar sesión
          </Link>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;