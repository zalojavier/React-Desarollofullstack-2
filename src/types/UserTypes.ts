

export interface User {
  id: string; 
  nombre: string;
  correo: string;
  rut: string; 
  contrasena: string;
  rol: 'Administrador' | 'Cliente';
  avatarUrl?: string; 
}

export interface UserForm {
    nombre: string;
    correo: string;
    rut: string;
    contrasena: string;
    rol: 'Administrador' | 'Cliente';
}