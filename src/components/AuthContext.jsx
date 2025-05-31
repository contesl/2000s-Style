//contexto para manejar el estado de autenticación y los tokens.
import React, { createContext, useState } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // Función para iniciar sesión
  const login = (userToken) => {
    setIsAuthenticated(true);
    setToken(userToken);
    localStorage.setItem('authToken', userToken); // Guardar el token en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};