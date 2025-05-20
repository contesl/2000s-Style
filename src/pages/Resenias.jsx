import React, { useState, useEffect } from 'react';

const Resenias = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [filtroCategoria, setFiltroCategoria] = useState('all'); // Estado para manejar el filtro de categorías
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando

  // Función para generar estrellas a partir del rating
  const generarEstrellas = (rating) => '⭐'.repeat(Math.round(rating));

  // Función para cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();

        // Excluir productos de la categoría "groceries"
        const productosValidos = data.products.filter(
          (producto) => producto.category !== 'groceries'
        );

        // Guardar los productos en el estado
        setProductos(productosValidos);

        // Obtener categorías únicas
        const categoriasUnicas = [
          ...new Set(productosValidos.map((producto) => producto.category)),
        ];
        setCategorias(categoriasUnicas);

        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Filtrar productos por categoría
  const productosFiltrados =
    filtroCategoria === 'all'
      ? productos
      : productos.filter((producto) => producto.category === filtroCategoria);

  return (
    <div className="container mt-4">
      <h1>Reseñas</h1>

      {/* Filtro de categorías */}
      <div className="mb-4">
        <label htmlFor="categoriaFiltro" className="form-label">
          Filtrar por categoría:
        </label>
        <select
          id="categoriaFiltro"
          className="form-select"
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="all">Todas</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Cargando reseñas...</p>
      ) : (
        <div className="row">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    {/* Encabezado del producto */}
                    <img
                      src={producto.thumbnail}
                      alt={producto.title}
                      className="img-fluid mb-3"
                    />
                    <p className="fw-bold">{producto.title}</p>
                  </div>

                  {/* Reseñas del producto */}
                  {producto.reviews && producto.reviews.length > 0 ? (
                    producto.reviews.map((resena, index) => (
                      <div key={index} className="card-footer">
                        <p>{generarEstrellas(resena.rating)}</p>
                        <p>{resena.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="card-footer">
                      <p>No hay reseñas para este producto.</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Resenias;