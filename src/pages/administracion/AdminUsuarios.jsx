import React, { useState, useEffect } from 'react';

const AdminUsuarios = () => {
  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState([]);
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    isAdmin: false,
  });
  // Estado para manejar el ID del usuario que se está editando
  const [editingUserId, setEditingUserId] = useState(null);
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState('');

  // URL de la API Mock
  const API_URL = 'https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/users';

  // Efecto para obtener los usuarios al cargar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para obtener los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Validar los campos del formulario
  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.email) {
      setErrorMessage('Todos los campos son obligatorios.');
      return false;
    }
    if (formData.username.length < 3) {
      setErrorMessage('El nombre de usuario debe tener al menos 3 caracteres.');
      return false;
    }
    if (formData.username.length > 15) {
      setErrorMessage('El nombre de usuario no puede tener más de 15 caracteres.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('El email ingresado no es válido.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Manejar el envío del formulario para agregar o actualizar un usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingUserId) {
        // Actualizar usuario existente
        await fetch(`${API_URL}/${editingUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setEditingUserId(null);
      } else {
        // Agregar nuevo usuario
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ username: '', password: '', email: '', isAdmin: false });
      fetchUsers();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  // Manejar la edición de un usuario
  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user.id);
  };

  // Manejar la eliminación de un usuario
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      fetchUsers();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Administración de Usuarios</h2>

      {/* Formulario para agregar/editar usuarios */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="isAdmin"
            name="isAdmin"
            className="form-check-input"
            checked={formData.isAdmin}
            onChange={handleInputChange}
          />
          <label htmlFor="isAdmin" className="form-check-label">Es Administrador</label>
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          {editingUserId ? 'Actualizar Usuario' : 'Agregar Usuario'}
        </button>
      </form>

      {/* Tabla de usuarios */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Sí' : 'No'}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                     </button>
                  <button
                        className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;
