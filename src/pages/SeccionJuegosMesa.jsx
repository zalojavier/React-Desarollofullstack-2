import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import './SeccionJuegosMesa.css'; // 2. Importamos el CSS nuevo

function SeccionJuegosMesa() {
  return (
    <>
      <Navbar /> {/* 3. Usamos tu Navbar principal */}

      {/* 4. Todo el 'body' de tu HTML, traducido a JSX */}
      <div className="container">
        <h1 className="titulo-seccion"><i className="bi bi-controller"></i> Juegos de Mesa</h1>
        <div className="row g-4">
          
          {/* */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 text-center">
              {/* 5. Recuerda cerrar <img /> */}
              <img src="https://m.media-amazon.com/images/I/71ESWRn9fTL._AC_SL1500_.jpg" className="card-img-top" alt="Catan" />
              <div className="card-body">
                <h5 className="card-title">Catan</h5>
                <p className="card-text">Juego de estrategia y comercio. Construye, negocia y conquista la isla.</p>
                <div>
                  <span className="precio">$29.990</span>
                  <span className="precio-tachado">$35.000</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0">
                {/* 6. Cambiamos <a> por <Link> y 'href' por 'to' */}
                <Link to="/productos/catan" className="btn btn-vermas">Ver más</Link>
              </div>
            </div>
          </div>

          {/* */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 text-center">
              <img src="https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017222593-1200-frontflat-copy.jpg" className="card-img-top" alt="Carcassonne" />
              <div className="card-body">
                <h5 className="card-title">Carcassonne</h5>
                <p className="card-text">Coloca fichas, construye ciudades y caminos en un juego dinámico y divertido.</p>
                <div>
                  <span className="precio">$24.990</span>
                  <span className="precio-tachado">$30.000</span>
                </div>
              </div>
              <div className="card-footer bg-transparent border-0">
                <Link to="/productos/carcassonne" className="btn btn-vermas">Ver más</Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* 7. Link de "Volver" ahora apunta a /categorias */}
        <Link to="/categorias" className="catalogo-link">← Volver al catálogo</Link>
      </div>

      <Footer /> {/* 8. Usamos tu Footer principal */}
    </>
  );
}

export default SeccionJuegosMesa;