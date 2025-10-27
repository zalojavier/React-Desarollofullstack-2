import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'; // Importamos el Navbar
import Footer from '../components/Footer.jsx'; // Importamos el Footer

function Home() {
  
  // Todo el contenido de la página va DENTRO del 'return'
  return (
    <>
      <Navbar /> {/* <-- Componente Navbar */}

      {/* */}
      <div className="container mt-3">
        <div className="gamer-alert">
          <span className="gamer-icon"><i className="bi bi-controller"></i></span>
          <strong>Cultura Gamer:</strong>
          <a href="https://www.ubisoft.com/es-mx/game/rainbow-six/siege/news-updates" target="_blank" rel="noopener noreferrer" className="gamer-link">
            Revisa el último parche de Rainbow Six siege
          </a>
          <div className="r6s-characters">
          <img src="/imagenesreact/logorainbo.png" alt="logo" />
          </div>
        </div>
      </div>

      {/* */}
      <nav>
        <button className="btn btn-add-cart w-100">🛒 Ver carrito</button>
      </nav>

      {/* */}
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Computadoras <strong>Gamer</strong> Armadas</h2>
        </div>
      </div>

      {/* */}
      <div className="container my-5">
        <div className="ofertas-banner p-4 rounded-4 mb-4 text-center">
          <h2 className="text-neon mb-3">
            <i className="bi bi-lightning-fill"></i> GRANDES OFTERTAS <i className="bi bi-lightning-fill"></i>
          </h2>
          <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
            
            {/* */}
            <div className="col">
              <div className="card h-100 shadow-lg border-0 oferta-card">
                <img src="https://m.media-amazon.com/images/I/71ybtvmLmDL.jpg" className="card-img-top img-fluid" alt="Auriculares Gamer HyperX Cloud II" />
                <div className="card-body bg-dark rounded-bottom">
                  <h6 className="text-muted small">Auriculares HyperX Cloud II</h6>
                  <p className="fw-bold text-light">Sonido envolvente y máxima comodidad</p>
                  <p className="text-success fw-bold h5 mb-0">$69.990</p>
                  <p className="text-decoration-line-through text-light">$79.990</p>
                  <button className="btn btn-primary w-100 mt-2">Agregar al carrito</button>
                  <Link to="/productos/audifonos" className="btn btn-primary w-100 mt-2">Ver detalles</Link>
                </div>
              </div>
            </div>
            
            {/* */}
            <div className="col">
              <div className="card h-100 shadow-lg border-0 oferta-card">
                <img src="https://cdnx.jumpseller.com/compuelite/image/62384054/thumb/610/610?1744328062" className="card-img-top img-fluid" alt="PC Gamer Elite" />
                <div className="card-body bg-dark rounded-bottom">
                  <h6 className="text-muted small">PC Gamer Elite</h6>
                  <p className="fw-bold text-light">Intel Core i7 + 32GB RAM tarjeta 4090</p>
                  <p className="text-success fw-bold h5 mb-0">$779.990</p>
                  <p className="text-decoration-line-through text-light">$899.990</p>
                  <button className="btn btn-primary w-100 mt-2">Agregar al carrito</button>
                  <Link to="/productos/pc-gamer-elite" className="btn btn-primary w-100 mt-2">Ver detalles</Link>
                </div>
              </div>
            </div>
            
            {/* */}
            <div className="col">
              <div className="card h-100 shadow-lg border-0 oferta-card">
                <img src="https://ae-pic-a1.aliexpress-media.com/kf/Sb18da7815a734c44b0ba99cff2bceeb6a.png_640x640.png" className="card-img-top img-fluid" alt="Control Xbox Series X" />
                <div className="card-body bg-dark rounded-bottom">
                  <h6 className="text-muted small">Control Xbox Series X</h6>
                  <p className="fw-bold text-light">Inalámbrico edición Doom Eternal</p>
                  <p className="text-success fw-bold h5 mb-0">$54.990</p>
                  <p className="text-decoration-line-through text-light">$59.990</p>
                  <button className="btn btn-primary w-100 mt-2">Agregar al carrito</button>
                  <Link to="/productos/control-xbox" className="btn btn-primary w-100 mt-2">Ver detalles</Link>
                </div>
              </div>
            </div>

            {/* */}
            <div className="col">
              <div className="card h-100 shadow-lg border-0 oferta-card">
                <img src="https://tienda.lancenter.cl/674-large_default/g502-heroe.jpg" className="card-img-top img-fluid" alt="Mouse Gamer Logitech G502 HERO" />
                <div className="card-body bg-dark rounded-bottom">
                  <h6 className="text-muted small"></h6>
                  <p className="fw-bold text-light">Mouse Gamer Logitech G502 HERO</p>
                  <p className="text-success fw-bold h5 mb-0">$39.990</p>
                  <p className="text-decoration-line-through text-light">$49.990</p>
                  <button className="btn btn-primary w-100 mt-2">Agregar al carrito</button>
                  <Link to="/productos/mouse-logitech" className="btn btn-primary w-100 mt-2">Ver detalles</Link>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* */}
      <div className="container mt-3">
        <div className="catalogo-alert d-flex align-items-center rounded-4 p-3 mb-4">
          <span className="catalogo-icon me-3">
            <i className="bi bi-stars"></i>
          </span>
          <strong className="me-2 text-catalogo">¡Revisa todo nuestro catálogo <span className="anim-aqui">aquí</span> </strong>
          <Link to="/categorias" className="btn btn-info btn-sm ms-auto">
            Ver catálogo
          </Link>
        </div>
      </div>

      {/* */}
      <div className="container my-5">
        <h2 className="text-center text-neon mb-4">
          <i className="bi bi-controller"></i> Noticias Gamer <i className="bi bi-controller"></i>
        </h2>
        
        <div className="row g-4">
          {/* */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 blog-card h-100">
              <img src="https://elchapuzasinformatico.com/wp-content/uploads/2019/04/Age-of-Empires-II.jpg" className="card-img-top" alt="Juegos retro de PC" />
              <div className="card-body bg-dark rounded-bottom">
                <h4 className="text-light">🎮 Top 5 Mejores Juegos Retro de PC</h4>
                <p className="text-muted">Revive la nostalgia gamer con estos clásicos inolvidables que marcaron época.</p>
                <ul className="list-unstyled text-light">
                  <li><strong>1. Doom (1993):</strong> El FPS que revolucionó el género.</li>
                  <li><strong>2. Half-Life (1998):</strong> Una historia inmersiva que redefinió la narrativa.</li>
                  <li><strong>3. StarCraft (1998):</strong> Estrategia en tiempo real que conquistó millones.</li>
                  <li><strong>4. Diablo II (2000):</strong> Acción, mazmorras y un mundo oscuro inolvidable.</li>
                  <li><strong>5. Age of Empires II (1999):</strong> Estrategia histórica con legiones de fans.</li>
                </ul>
                <Link to="/blog/juegos-retro" className="btn btn-info mt-2">Leer más</Link>
              </div>
            </div>
          </div>
      
          {/* */}
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 blog-card h-100">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-2urcAVb7CMvCQvm7ncqokjTD7-OtVNULGQ&s" className="card-img-top" alt="PC Gamer" />
              <div className="card-body bg-dark rounded-bottom">
                <h4 className="text-light">💻 Guía para Elegir tu PC Gamer Ideal</h4>
                <p className="text-muted">¿Estás pensando en comprar una computadora gamer? Aquí tienes algunos consejos clave:</p>
                <ul className="list-unstyled text-light">
                  <li>⚡ <strong>Procesador:</strong> Asegúrate de elegir uno potente como Ryzen 7 o Intel i7.</li>
                  <li>🎨 <strong>Tarjeta gráfica:</strong> Invierte en una buena GPU, como la RTX 4060 o superior.</li>
                  <li>🧠 <strong>Memoria RAM:</strong> Mínimo 16GB para gaming fluido.</li>
                  <li>🖥️ <strong>Almacenamiento:</strong> Opta por SSD NVMe para cargas rápidas.</li>
                  <li>🔧 <strong>Refrigeración:</strong> No descuides el sistema de enfriamiento.</li>
                </ul>
                <Link to="/blog/armar-pc" className="btn btn-info mt-2">Leer más</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="container my-3">
        <a href="https://wa.me/5219999999999?text=Hola%20quiero%20consultar%20sobre%20soporte%20técnico" target="_blank" rel="noopener noreferrer" className="btn btn-success wsp-support">
          <i className="bi bi-whatsapp"></i> Chat Soporte Técnico
        </a>
      </div>

      {/* */}
      <div className="container social-share my-4">
        <span>Compartir:</span>
        <a href="https://www.facebook.com/sharer/sharer.php?u=https://tu-tienda.com/producto1" target="_blank" rel="noopener noreferrer" className="btn-social facebook" title="Compartir en Facebook">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="https://twitter.com/intent/tweet?url=https://tu-tienda.com/producto1&text=¡Mira este producto gamer!" target="_blank" rel="noopener noreferrer" className="btn-social twitter" title="Compartir en X">
          <i className="bi bi-twitter-x"></i>
        </a>
        <a href="https://wa.me/?text=¡Mira%20este%20producto%20gamer%20en%20https://tu-tienda.com/producto1" target="_blank" rel="noopener noreferrer" className="btn-social whatsapp" title="Compartir en WhatsApp">
          <i className="bi bi-whatsapp"></i>
        </a>
        <a href="https://instagram.com/mi_tienda_gamer" target="_blank" rel="noopener noreferrer" className="btn-social instagram" title="Instagram">
          <i className="bi bi-instagram"></i>
        </a>
      </div>
      
      <Footer /> {/* <-- Componente Footer */}
      
    </> // <-- Cierra el fragment
  ); // <-- Cierra el return
} // <-- Cierra la función Home

export default Home;