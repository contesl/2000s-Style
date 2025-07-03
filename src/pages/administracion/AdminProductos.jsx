import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  // Estado para almacenar las categorías únicas
  const [categorias, setCategorias] = useState([]);
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    thumbnail: '', // Campo para el enlace de la imagen
  });
  // Estado para manejar el ID del producto que se está editando
  const [editingProductId, setEditingProductId] = useState(null);
  // Estado para manejar mensajes de error
  const [errorMessage, setErrorMessage] = useState('');
  // URL de la API Mock
  const API_URL = 'https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/products';

  // Efecto para obtener los productos al cargar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Función para obtener los productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);

      // Extraer categorías únicas
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategorias(uniqueCategories);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validar los campos del formulario
  const validateForm = () => {
    if (!formData.title) {
      setErrorMessage('El título es obligatorio.');
      return false;
    }
    if (formData.description.length < 10) {
      setErrorMessage('La descripción debe tener al menos 10 caracteres.');
      return false;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      setErrorMessage('El precio debe ser un número mayor que cero.');
      return false;
    }
    //if (isNaN(formData.stock) || formData.stock <= 0) {
    //  setErrorMessage('El stock debe ser un número mayor que cero.');
    //  return false;
    //}
    if (!formData.category) {
      setErrorMessage('Debe seleccionar una categoría.');
      return false;
    }
    if (!formData.thumbnail || !formData.thumbnail.startsWith('http')) {
      setErrorMessage('Debe proporcionar un enlace válido para la imagen.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Manejar el envío del formulario para agregar o actualizar un producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Convertir explícitamente price y stock a números
    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    try {
      if (editingProductId) {
        // Actualizar producto existente
        await fetch(`${API_URL}/${editingProductId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
        setEditingProductId(null);
      } else {
        // Agregar nuevo producto
        await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
      }
      setFormData({ title: '', description: '', price: '', category: '', stock: '', thumbnail: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  // Manejar la edición de un producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditingProductId(product.id);
  };

  // Manejar la eliminación de un producto
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Administración de Productos</h1>
      {/* Formulario para agregar/editar productos */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Enlace de la Imagen</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Ingrese el enlace de la imagen"
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">
          {editingProductId ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      {/* Tabla de productos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <img src={product.thumbnail} alt={product.title} style={{ width: '50px' }} />
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;