// src/api/userApi.ts

import type { User, UserForm } from '../types/UserTypes';

const USER_STORAGE_KEY = 'usuarios';

// --- USUARIOS POR DEFECTO (Seeding Data) ---
const DEFAULT_USERS: User[] = [
    // Aseguramos que los IDs de siembra sean números convertibles
    {
        id: '1',
        nombre: 'Admin General',
        correo: 'admin@duocuc.cl', 
        rut: '11.111.111-1',
        contrasena: 'admin123', 
        rol: 'Administrador',
        avatarUrl: '/imagenesreact/avatar_admin.png',
    },
    {
        id: '2',
        nombre: 'Cliente Prueba',
        correo: 'cliente@gmail.com',
        rut: '22.222.222-2',
        contrasena: 'cliente123',
        rol: 'Cliente',
        avatarUrl: '/imagenesreact/avatar_cliente.png',
    },
];
// ------------------------------------------

// --- Funciones Internas de Ayuda ---

// 1. Guarda el arreglo completo de usuarios en localStorage (Interna).
const saveUsers = (users: User[]): void => {
    try {
        const serializedUsers = JSON.stringify(users);
        localStorage.setItem(USER_STORAGE_KEY, serializedUsers);
    } catch (error) {
        console.error("Error al guardar usuarios en localStorage:", error);
    }
};

// 2. Carga todos los usuarios desde localStorage (Interna).
const loadUsers = (): User[] => {
    try {
        const serializedUsers = localStorage.getItem(USER_STORAGE_KEY);
        
        if (serializedUsers === null) {
            return [];
        }
        
        // 🔑 Tipado: Aseguramos que el resultado parseado sea un arreglo de User
        const users = JSON.parse(serializedUsers) as User[];
        if (users.length === 0) return [];

        return users;

    } catch (error) {
        console.error("Error al cargar usuarios de localStorage:", error);
        return [];
    }
};

// --- Lógica de Siembra y Carga Robusta ---

/**
 * Carga todos los usuarios, asegurando primero que la lista esté sembrada si es necesario.
 */
export const loadAndSeedUsers = (): User[] => {
    let users = loadUsers();
    
    if (users.length === 0) {
        // Ejecuta el seed si no hay usuarios
        console.log("Usuarios por defecto cargados.");
        saveUsers(DEFAULT_USERS);
        // Recarga la lista ya sembrada
        users = loadUsers(); 
    }
    return users;
}


// --- Funciones Exportadas (API Pública) ---

/**
 * Inicializa los usuarios por defecto en localStorage si no existen.
 */
export const seedUsers = (): void => {
    loadAndSeedUsers(); 
};

/**
 * Devuelve la cantidad total de usuarios en el sistema.
 */
export const getUserCount = (): number => {
    const usersArray = loadUsers(); 
    return usersArray.length;
} 

/**
 * Crea un nuevo usuario y lo guarda en localStorage.
 */
export const createUser = (formData: UserForm): boolean => {
    const users = loadAndSeedUsers(); 

    // Validaciones de unicidad 
    if (users.some(u => u.correo.toLowerCase() === formData.correo.toLowerCase())) {
        return false; // Email duplicado
    }

    // 🔑 LÓGICA DE AUTOINCREMENTO: Encontrar el ID numérico más alto.
    const maxId = users.reduce((max, user) => {
        // Intentamos convertir el ID (que es string) a número.
        const userIdAsNumber = parseInt(user.id, 10);
        // Retornamos el máximo entre el 'max' acumulado y el ID actual (si es un número válido).
        return isNaN(userIdAsNumber) ? max : Math.max(max, userIdAsNumber);
    }, 0);
    
    // El nuevo ID es el máximo encontrado + 1, y lo volvemos a string.
    const newId = (maxId + 1).toString();
    // -----------------------------------------------------------------

    const newUser: User = {
        ...formData,
        id: newId, // 🔑 ASIGNAMOS EL ID AUTOINCREMENTAL
        avatarUrl: formData.rol === 'Administrador' 
             ? '/imagenesreact/avatar_admin.png' 
             : '/imagenesreact/avatar_cliente.png',
    };

    users.push(newUser);
    saveUsers(users);
    return true;
};