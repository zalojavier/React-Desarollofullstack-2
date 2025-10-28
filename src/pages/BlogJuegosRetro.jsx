import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/BlogJuegosRetro.css'; // <-- 1. ¡IMPORTAMOS EL CSS NUEVO!


function BlogJuegosRetro() {
  return (
    <>
      <Navbar /> {/* <-- 2. Usamos tu Navbar principal */}
      
      {/* 3. Copiamos el contenido del <body> y lo "traducimos" a JSX */}
      <div className="container">
        
        <div className="hero">
          <h1>5 Leyendas de los Videojuegos</h1>
          <p>Descubre los títulos que no solo definieron una era, sino que sentaron las bases de lo que hoy conocemos y amamos en la industria.</p>
        </div>
        
        <div className="games-grid">
          {/* */}
          <div className="game-card">
            <div className="game-number">1</div>
            {/* 4. Recuerda cerrar todas las <img> con "/>" */}
            <img src="https://preview.redd.it/lycuxhh6ksk01.png?width=1080&crop=smart&auto=webp&s=60516e657d896260ec5048a93e138d9b0bb56aab" alt="Doom (1993)" className="game-image" />
            <h2 className="game-title">Doom</h2>
            <div className="game-year">1993</div>
            <p className="game-description">El caos y la acción desenfrenada toman forma en este FPS pionero. Con una jugabilidad visceral y adictiva, Doom no solo popularizó el género de disparos en primera persona, sino que se convirtió en un fenómeno cultural imparable.</p>
          </div>
          
          {/* */}
          <div className="game-card">
            <div className="game-number">2</div>
            <img src="https://i.blogs.es/4e6e7d/imagen-half-life/500_333.jpeg" alt="Half-Life (1998)" className="game-image" />
            <h2 className="game-title">Half-Life</h2>
            <div className="game-year">1998</div>
            <p className="game-description">Más que un simple shooter, Half-Life es una experiencia narrativa magistral. Siguiendo la silenciosa odisea del científico Gordon Freeman, revolucionó la narrativa en los videojuegos al sumergir al jugador en un mundo creíble sin recurrir a cutscenes.</p>
          </div>
          
          {/* */}
          <div className="game-card">
            <div className="game-number">3</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg6HuiilyDJN-fYLvrnfpo8pxPP4J9Q6bptg&s" alt="StarCraft (1998)" className="game-image" />
            <h2 className="game-title">StarCraft</h2>
            <div className="game-year">1998</div>
            <p className="game-description">La estrategia en tiempo real alcanzó su cénit con este título. Con tres razas únicas y un equilibrio casi perfecto, creó un ecosistema competitivo legendario que dominó las competiciones y solidificó a Corea del Sur como la meca del gaming profesional.</p>
          </div>
          
          {/* */}
          <div className="game-card">
            <div className="game-number">4</div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr13l1fE39omWLjEwbmiHgGahm-q9mjaQgCQ&s" alt="Diablo II (2000)" className="game-image" />
            <h2 className="game-title">Diablo II</h2>
            <div className="game-year">2000</div>
            <p className="game-description">Adéntrate en un mundo gótico de pesadilla y demonios. Este RPG de acción es el paradigma del "solo una misión más". Con un sistema de loot infinitamente gratificante y una atmósfera oscura e inquietante.</p>
          </div>
          
          {/* */}
          <div className="game-card">
            <div className="game-number">5</div>
            <img src="https://elchapuzasinformatico.com/wp-content/uploads/2019/04/Age-of-Empires-II.jpg" alt="Age of Empires II (1999)" className="game-image" />
            <h2 className="game-title">Age of Empires II</h2>
            <div className="game-year">1999</div>
            <p className="game-description">Un viaje épico a través de la historia. Desde la Edad Media hasta el Renacimiento, este juego de estrategia combina una jugabilidad profunda, una campaña histórica educativa y una longevidad envidiable.</p>
          </div>
        </div>
        
        {/* El <footer> simple de esta página lo podemos dejar si quieres,
            o puedes borrarlo si prefieres que solo esté el Footer principal */}
        <footer>
          <p>© 2025 Mi tienda Pc gamer - Todos los derechos reservados</p>
          <p>Estos cinco pilares no son solo juegos; son la herencia que todo jugador debe conocer.</p>
        </footer>
      </div>
      
      <Footer /> {/* <-- 5. Usamos tu Footer principal */}
    </>
  );
}

export default BlogJuegosRetro;