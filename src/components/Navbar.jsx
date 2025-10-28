import { Link } from 'react-router-dom'; // 1. Esto está perfecto

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container position-relative justify-content-center">
        <Link className="navbar-brand" to="/">Mi Tienda Pc gamer</Link>
        <Link className="navbar-brand mx-auto d-block" to="/">
          <img
            src="/imagenesreact/pixel.png"
            alt="Logo Gamer Tienda de Computadoras"
            className="navbar-logo-img"
          />
        </Link>
        
        {/* 2. AQUÍ ESTÁ EL CAMBIO: */}
        {/* Cambiamos <button> por <Link> y añadimos el "to='/login'" */}
        <Link to="/login" className="btn btn-login me-2 position-absolute end-0">
          <i className="bi bi-person"></i> Iniciar sesión
        </Link>
        
      </div>
    </nav>
  );
}

export default Navbar;