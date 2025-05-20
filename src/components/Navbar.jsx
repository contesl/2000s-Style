import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand custom-nav-link" to="/">
            2000s STYLE
          </Link>

          {/* Botón para el menú colapsable */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Enlaces del menú */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/quienes-somos">
                  Quiénes somos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/productos">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/resenias">
                  Reseñas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>

            {/* Botón destacado para el carrito */}
            <button
              className="btn btn-warning btn-carrito"
              data-bs-toggle="modal"
              data-bs-target="#carritoModal"
            >
              🛒 Carrito
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

    
