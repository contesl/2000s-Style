import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import QuienesSomos from './pages/QuienesSomos';
import Productos from './pages/Productos';
import Resenias from './pages/Resenias';
import Contacto from './pages/Contacto';

const App = () => {
  const location = useLocation(); // Hook para obtener la ruta actual

  return (
    <>
      <Navbar />
      {/* Mostrar el Header solo si no estamos en la página de Inicio */}
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/resenias" element={<Resenias />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

