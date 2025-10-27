import type { User, UserForm } from '../types/UserTypes';

const USER_STORAGE_KEY = 'usuarios';

// --- USUARIOS POR DEFECTO (Seeding Data) ---
const DEFAULT_USERS: User[] = [
  {
    id: '1',
    nombre: 'Admin General',
    correo: 'admin@duocuc.cl', // Correo del administrador
    rut: '11.111.111-1',
    contrasena: 'admin123', // Contraseña para pruebas
    rol: 'Administrador',
    avatarUrl: '/imagenesreact/avatar_admin.png', // Usar ruta de carpeta public
  },
  {
    id: '2',
    nombre: 'Cliente Prueba',
    correo: 'cliente@gmail.com', // Correo del cliente
    rut: '22.222.222-2',
    contrasena: 'cliente123', // Contraseña para pruebas
    rol: 'Cliente',
    avatarUrl: '/imagenesreact/avatar_cliente.png', // Usar ruta de carpeta public
  },
];
// ------------------------------------------

/**
 * Guarda los usuarios por defecto en localStorage si no hay usuarios existentes.
 */
export const seedUsers = (): void => {
  const users = loadUsers(false); // Carga sin intentar hacer el seed recursivamente

  if (users.length === 0) {
    saveUsers(DEFAULT_USERS);
    console.log("Usuarios por defecto cargados.");
  }
};

/**
 * Carga todos los usuarios desde localStorage.
 * Si shouldSeed es true (por defecto), intentará poblar la lista si está vacía.
 * @param {boolean} shouldSeed - Indica si debe intentar cargar usuarios por defecto si no hay.
 */
export const loadUsers = (shouldSeed: boolean = true): User[] => {
  try {
    const serializedUsers = localStorage.getItem(USER_STORAGE_KEY);
    
    if (serializedUsers === null || JSON.parse(serializedUsers).length === 0) {
      if (shouldSeed) {
        seedUsers();
        // Recargar después de sembrar para obtener la lista recién guardada
        return loadUsers(false); 
      }
      return [];
    }
    // Asumimos que los datos serializados son un arreglo de Users
    return JSON.parse(serializedUsers);
  } catch (error) {
    console.error("Error al cargar usuarios de localStorage:", error);
    return [];
  }
};

/**
 * Guarda el arreglo completo de usuarios en localStorage.
 */
export const saveUsers = (users: User[]): void => {
  try {
    const serializedUsers = JSON.stringify(users);
    localStorage.setItem(USER_STORAGE_KEY, serializedUsers);
  } catch (error) {
    console.error("Error al guardar usuarios en localStorage:", error);
  }
};

/**
 * Crea un nuevo usuario y lo guarda en localStorage.
 */
export const createUser = (formData: UserForm): boolean => {
  // Usamos loadUsers(false) para evitar que la aplicación intente hacer seed 
  // si un usuario es creado antes que el inicio.
  const users = loadUsers(false); 

  // Validaciones de unicidad 
  if (users.some(u => u.correo.toLowerCase() === formData.correo.toLowerCase())) {
    return false; // Email duplicado
  }

  const newUser: User = {
    ...formData,
    id: Date.now().toString(), // Usamos un timestamp como ID único simple
    avatarUrl: formData.rol === 'Administrador' 
        ? '/imagenesreact/avatar_admin.png' 
        : '/imagenesreact/avatar_cliente.png',
  };

  users.push(newUser);
  saveUsers(users);
  return true;
};