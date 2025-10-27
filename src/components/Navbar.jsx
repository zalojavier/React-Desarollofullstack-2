import { Link } from 'react-router-dom'; // Importamos Link para la navegación

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container position-relative justify-content-center">
        <Link className="navbar-brand" to="/">Mi Tienda Pc gamer</Link>
        <Link className="navbar-brand mx-auto d-block" to="/">
          {/* Usamos la clase de styles.css y cerramos la etiqueta img */}
          <img
            src="/imagenesreact/pixel.png"
            alt="Logo Gamer Tienda de Computadoras"
            className="navbar-logo-img"
          />
        </Link>
        <button className="btn btn-login me-2 position-absolute end-0">
          <i className="bi bi-person"></i> Iniciar sesión
        </button>
      </div>
    </nav>
  );
}

export default Navbar;