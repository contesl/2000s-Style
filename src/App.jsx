import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './components/AuthContext'; // Importar el contexto
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductoDetalle from './components/ProductoDetalle';
import Inicio from './pages/Inicio';
import QuienesSomos from './pages/QuienesSomos';
import Productos from './pages/Productos';
import Resenias from './pages/Resenias';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProductos from './pages/administracion/AdminProductos';
import AdminUsuarios from './pages/administracion/AdminUsuarios';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/resenias" element={<Resenias />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute>
              <Productos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administracion/productos"
          element={
            <ProtectedRoute>
              <AdminProductos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/administracion/usuarios"
          element={
            <ProtectedRoute>
              <AdminUsuarios />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

const AppWrapper = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Lógica para eliminar la sesión
      localStorage.clear(); // Eliminar todos los datos de localStorage
      sessionStorage.clear(); // Eliminar todos los datos de sessionStorage
      console.log('Sesión eliminada al cerrar la página.');
    };

    // Agregar el evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default AppWrapper;