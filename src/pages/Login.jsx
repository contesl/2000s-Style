import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState(''); // Estado para el mensaje del modal
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simular una llamada a MockAPI para autenticar al usuario
      const response = await fetch('https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/users'); // Reemplaza con tu URL de MockAPI
      const users = await response.json();

      // Buscar al usuario por nombre de usuario y contraseña
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        const fakeToken = '1234567890abcdef'; // Simular un token
        login(fakeToken, user); // Pasar el token y los datos del usuario al contexto
        setModalMessage(`¡Bienvenido, ${user.username}!`); // Mensaje dinámico con el nombre de usuario
        setShowModal(true); // Mostrar el modal de bienvenida
        setTimeout(() => {
          setShowModal(false); // Ocultar el modal después de 2 segundos
          navigate('/'); // Redirigir a la página de inicio
        }, 2000);
      } else {
        setModalMessage('Credenciales incorrectas. Por favor, inténtalo nuevamente.');
        setShowModal(true); // Mostrar el modal de error
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setModalMessage('Ocurrió un error. Por favor, inténtalo nuevamente.');
      setShowModal(true); // Mostrar el modal de error
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>

      {/* Modal de Bootstrap */}
      {showModal && (
        <>
          {/* Fondo del modal */}
          <div className="modal-backdrop fade show"></div>

          {/* Contenido del modal */}
          <div
            className="modal fade show"
            tabIndex="-1"
            style={{
              display: 'block',
              zIndex: 1055, // Asegura que el modal esté por encima de otros elementos
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mensaje</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{modalMessage}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;