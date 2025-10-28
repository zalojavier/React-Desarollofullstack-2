import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Categorias.css'; // 2. Importamos el CSS nuevo

function Categorias() {
  return (
    <>
      <Navbar /> {/* 3. Usamos tu Navbar principal */}

      {/* 4. Todo el 'body' de tu HTML, traducido a JSX */}
      <div className="container catalogo-container">
        <h1 className="text-center mb-4 catalogo-title">
          <i className="bi bi-lightning-fill"></i> Categorías <i className="bi bi-lightning-fill"></i>
        </h1>
        <ul className="list-group">
          
          {/* 5. Todos los <a> se cambian por <Link> y 'href' por 'to' */}
          <li className="list-group-item">
            <Link to="/secciones/juegosdemesa"><i className="bi bi-controller"></i> Juegos de mesa</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/accesorios"><i className="bi bi-headset"></i> Accesorios</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/consolas"><i className="bi bi-xbox"></i> Consolas</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/pcdeescritorio"><i className="bi bi-pc-display"></i> Computadoras gamers</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/sillasgamers"><i className="bi bi-chair"></i> Sillas gamer</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/mousepad"><i className="bi bi-mouse"></i> Mousepads</Link>
          </li>
          <li className="list-group-item">
            <Link to="/secciones/poleraspersonalizadas"><i className="bi bi-shirt"></i> Poleras y polerones personalizados</Link>
          </li>
        </ul>
      </div>

      <Footer /> {/* 6. Usamos tu Footer principal */}
    </>
  );
}

export default Categorias;