// src/types/UserTypes.ts

export interface User {
  id: string; // Usamos string, ya que en localStorage no hay autoincremento fácil
  nombre: string;
  correo: string;
  rut: string; 
  contrasena: string;
  rol: 'Administrador' | 'Cliente';
  avatarUrl?: string; // Opcional, para el archivo o URL
}

// Interfaz para los datos que se reciben directamente del formulario
export interface UserForm {
    nombre: string;
    correo: string;
    rut: string;
    contrasena: string;
    rol: 'Administrador' | 'Cliente';
    // Nota: El avatar será un campo simple en la UI por ahora
}