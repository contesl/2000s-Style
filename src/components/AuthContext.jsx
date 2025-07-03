import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // Nuevo estado para almacenar los datos del usuario

  // Función para iniciar sesión
  const login = (userToken, userData) => {
    setIsAuthenticated(true);
    setToken(userToken);
    setUser(userData); // Guardar los datos del usuario
    localStorage.setItem('authToken', userToken); // Guardar el token en localStorage
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar los datos del usuario en localStorage
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null); // Limpiar los datos del usuario
    localStorage.removeItem('authToken'); // Eliminar el token de localStorage
    localStorage.removeItem('user'); // Eliminar los datos del usuario de localStorage
  };

  // Efecto para cargar el estado inicial desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // Cargar los datos del usuario desde localStorage
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};