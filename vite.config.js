import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Asegúrate que tu plugin se llame así, podría ser @vitejs/plugin-react-swc

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- AÑADE ESTA SECCIÓN ---
  test: {
    globals: true,         // Para no tener que importar describe, it, etc. en cada test
    environment: 'jsdom',  // <-- ¡ESTA ES LA LÍNEA CLAVE! Le dice que use jsdom
    setupFiles: './src/setupTests.js', // Opcional, pero útil para configuración extra
    // Si usas CSS Modules (archivos .module.css), añade esto:
    // css: {
    //  modules: {
    //    classNameStrategy: 'non-scoped',
    //  },
    // },
  },
  // --------------------------
})