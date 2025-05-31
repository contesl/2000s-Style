// Importación de React
import React from 'react';

// Importación de componentes de React Router para el manejo de rutas
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './components/AuthContext'; // Importar el contexto
// Importación de componentes personalizados de la aplicación
import Navbar from './components/Navbar';       // Barra de navegación superior
import Header from './components/Header';       // Encabezado (visible en todas las páginas excepto la principal)
import Footer from './components/Footer';       // Pie de página común a todas las vistas
import ProductoDetalle from './components/ProductoDetalle'; // importa el nuevo componente
// Importación de las páginas de la aplicación
import Inicio from './pages/Inicio';            // Página de inicio
import QuienesSomos from './pages/QuienesSomos';// Página "¿Quiénes somos?"
import Productos from './pages/Productos';      // Página de productos
import Resenias from './pages/Resenias';        // Página de reseñas de usuarios o productos
import Contacto from './pages/Contacto';        // Página de contacto
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Componente principal de la aplicación
const App = () => {
  // Hook que nos permite acceder a la ruta actual (pathname)
  const location = useLocation();

  return (
    <>
      {/* Navbar se muestra siempre, en todas las páginas */}
      <Navbar />

      {/* Header solo se muestra si NO estamos en la página de inicio */}
      {location.pathname !== '/' && <Header />}

      {/* Definición de las rutas de la aplicación */}
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<Inicio />} />

        {/* Ruta para la página "¿Quiénes somos?" */}
        <Route path="/quienes-somos" element={<QuienesSomos />} />

        {/* Ruta para la página de productos */}
        <Route path="/productos" element={<Productos />} />

        {/* Ruta para la página de reseñas */}
        <Route path="/resenias" element={<Resenias />} />

        {/* Ruta para la página de contacto */}
        <Route path="/contacto" element={<Contacto />} />

        {/* Ruta para la página de descripcion ampliada del producto */}
        <Route path="/productos/:id" element={<ProductoDetalle />} />

        <Route path="/login" element={<Login />} />
        {/* Rutas protegidas */}
              <Route
                path="/carrito"
                element={
                  <ProtectedRoute>
                    <Productos />
                  </ProtectedRoute>
                }
              />
      </Routes>

      {/* Footer se muestra siempre, en todas las páginas */}
      <Footer />
    </>
  );
};

// AppWrapper es un componente de orden superior que envuelve a <App />
// en un <Router> para que pueda usar React Router correctamente
const AppWrapper = () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

// Se exporta AppWrapper como componente principal de la aplicación
export default AppWrapper;
