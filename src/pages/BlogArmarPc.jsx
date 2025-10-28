import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/BlogArmarPc.css'; // <-- 1. ¡IMPORTAMOS EL CSS NUEVO!

function BlogArmarPc() {
  return (
    <>
      <Navbar /> {/* <-- 2. Usamos tu Navbar principal */}
      
      {/* 3. Copiamos el contenido del <body> y lo "traducimos" a JSX */}
      <div className="container">

        <div className="hero">
          <h1>Consejos para Armar tu PC Gamer</h1>
          <p>Aprende cómo construir la máquina de tus sueños con esta guía esencial para principiantes y expertos.</p>
        </div>
        
        <div className="tips-grid">
          {/* */}
          <div className="tip-card">
            <div className="tip-number">1</div>
            {}
            <img src="https://images.unsplash.com/photo-1562976540-1502c2145186?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Presupuesto para PC Gamer" className="tip-image" />
            <h2 className="tip-title">Define tu presupuesto</h2>
            <p className="tip-description">Establece un presupuesto realista antes de comenzar. Esto te ayudará a tomar decisiones sobre qué componentes priorizar y evitará gastos innecesarios.</p>
          </div>
          
          {/* */}
          <div className="tip-card">
            <div className="tip-number">2</div>
            <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Componentes compatibles" className="tip-image" />
            <h2 className="tip-title">Verifica compatibilidad</h2>
            <p className="tip-description">Asegúrate de que todos los componentes sean compatibles entre sí. Presta especial atención al socket de la CPU con la placa base y la RAM compatible.</p>
          </div>
          
          {/* */}
          <div className="tip-card">
            <div className="tip-number">3</div>
            <img src="https://cl-media.hptiendaenlinea.com/magefan_blog/Guia_de_compra_para_GPU_Como_escoger_la_tarjeta_grafica_indicada_1.jpg" alt="Tarjeta gráfica" className="tip-image" />
            <h2 className="tip-title">Invierte en una buena GPU</h2>
            <p className="tip-description">La tarjeta gráfica es crucial para gaming. Asigna una parte significativa de tu presupuesto a una GPU que satisfaga tus necesidades de rendimiento.</p>
          </div>
          
          {/* */}
          <div className="tip-card">
            <div className="tip-number">4</div>
            <img src="https://http2.mlstatic.com/D_NQ_NP_742828-MLU73079405419_112023-O.webp" alt="Fuente de poder" className="tip-image" />
            <h2 className="tip-title">No escatimes en la fuente de poder</h2>
            <p className="tip-description">Una fuente de alimentación de calidad protege tus componentes de fluctuaciones de energía. Elige una con certificación 80 Plus y suficiente potencia.</p>
          </div>
          
          {/* */}
          <div className="tip-card">
            <div className="tip-number">5</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFooWGSLHhqUI4IGGvjpciWtSngfFanDXovg&s" alt="Refrigeración PC" className="tip-image" />
            <h2 className="tip-title">Sistema de refrigeración adecuado</h2>
            <p className="tip-description">Mantén tus componentes frescos con un buen sistema de refrigeración. Considera ventiladores adicionales o refrigeración líquida según tus necesidades.</p>
          </div>
          
          {/* */}
          <div className="tip-card">
            <div className="tip-number">6</div>
            <img src="https://i.ytimg.com/vi/vXpAsf7SJ3M/maxresdefault.jpg" alt="SSD para PC" className="tip-image" />
            <h2 className="tip-title">Incluye un SSD en tu build</h2>
            <p className="tip-description">Un SSD acelerará significativamente los tiempos de carga del sistema y juegos. Idealmente, usa un SSD para el sistema operativo y un HDD para almacenamiento.</p>
          </div>
        </div>
        
        {/* Dejamos este footer local que es parte del diseño de la página de blog */}
        <footer>
          <p>© 2025 Mi tienda Pc gamer - Todos los derechos reservados</p>
          <p>Consejos expertos para armar el PC gamer perfecto para tus necesidades.</p>
        </footer>
      </div>
      
      <Footer /> {/* <-- 5. Usamos tu Footer principal */}
    </>
  );
}

export default BlogArmarPc;