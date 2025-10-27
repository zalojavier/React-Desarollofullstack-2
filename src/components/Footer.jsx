function Footer() {
    return (
      <footer className="bg-dark text-white pt-4">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-6 mb-3">
              <h5 className="text-uppercase text-info">Sobre Nosotros</h5>
              {/* Usamos la clase de styles.css */}
              <p className="text-light footer-about-text">
                En <strong>Mi Tienda PC Gamer</strong>, compartimos tu pasión...
                {/* (puedes copiar el resto del texto de tu HTML) */}
              </p>
            </div>
            <div className="col-md-3 mb-3">
              <h5 className="text-uppercase text-info">Contáctanos</h5>
              <p className="mb-1"><i className="bi bi-envelope-fill"></i> soporte@mitiendagamer.com</p>
              <p className="mb-1"><i className="bi bi-telephone-fill"></i> +56 9 9999 9999</p>
              <p><i className="bi bi-geo-alt-fill"></i> Santiago, Chile</p>
            </div>
          </div>
          {/* La etiqueta <hr> debe cerrarse sola */}
          <hr className="border-light" />
          <p className="text-center mb-0">© 2025 Mi Tienda PC Gamer. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }
  
  export default Footer;