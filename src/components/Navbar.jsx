import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Asegúrate de importar el contexto de autenticación

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext); // Accede al estado de autenticación, usuario y la función de logout
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirige a la página de login
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Borra todo lo que hay en sessionStorage
    logout(); // Llama a la función de logout del contexto
    navigate('/'); // Redirige al usuario a la página de inicio después de cerrar sesión
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
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
              {/* Dropdown for Catálogo y Compra en Línea */}
              <li className="nav-item dropdown">
                <button
                  className="btn btn-secondary nav-link dropdown-toggle custom-nav-link"
                  id="catalogoDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Catálogo y Compra en Línea
                </button>
                <ul className="dropdown-menu" aria-labelledby="catalogoDropdown">
                  <li>
                    <Link className="dropdown-item" to="/productos">
                      Productos
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/resenias">
                      Reseñas
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link custom-nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
              {/* Mostrar Carrito y Administración solo si el usuario está autenticado */}
              {isAuthenticated && (
                <>
                  {/* Botón de carrito */}
                  <li className="nav-item">
                    <button
                      className="btn btn-warning nav-link custom-nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#carritoModal"
                    >
                      🛒 Carrito
                    </button>
                  </li>
                  {/* Dropdown de Administración: Solo visible si el usuario es administrador */}
                  {user?.isAdmin && (
                    <li className="nav-item dropdown">
                      <button
                        className="btn btn-secondary nav-link dropdown-toggle custom-nav-link"
                        id="administracionDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Administración
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="administracionDropdown">
                        <li>
                          <Link className="dropdown-item" to="/administracion/productos">
                            Productos
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/administracion/usuarios">
                            Usuarios
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </>
              )}
              {/* Botón de ingresar/logout */}
              <li className="nav-item">
                {isAuthenticated ? (
                  <button
                    className="btn btn-secondary nav-link custom-nav-link"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary nav-link custom-nav-link"
                    onClick={handleLogin}
                  >
                    Ingresar
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;