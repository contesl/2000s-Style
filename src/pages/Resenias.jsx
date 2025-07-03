import React, { useState, useEffect } from 'react';
const Resenias = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos
  const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
  const [filtroCategoria, setFiltroCategoria] = useState('all'); // Estado para manejar el filtro de categorías
  const [loading, setLoading] = useState(true); // Estado para manejar el cargando
  const [paginaActual, setPaginaActual] = useState(1); // Estado para manejar la página actual
  const productosPorPagina = 4; // Número de productos por página

  // Función para generar estrellas a partir del rating
  const generarEstrellas = (rating) => '⭐'.repeat(Math.round(rating));

  // Función para cargar los productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/products");
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        // Excluir productos de la categoría "groceries"
        const productosValidos = data.filter(
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
  const productosFiltrados = filtroCategoria === 'all'
    ? productos
    : productos.filter((producto) => producto.category === filtroCategoria);

  // Calcular los productos a mostrar en la página actual
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginados = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  // Cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Generar botones de paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const botonesPaginacion = [];
  for (let i = 1; i <= totalPaginas; i++) {
    botonesPaginacion.push(
      <li key={i} className={`page-item ${paginaActual === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => cambiarPagina(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Reseñas</h1>
      {/* Filtro de categorías */}
      <div className="mb-3">
        <label htmlFor="categoriaSelect" className="form-label">
          Seleccione la categoría o Todas:
        </label>
        <select
          id="categoriaSelect"
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
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : (
        <>
          {productosFiltrados.length > 0 ? (
            <>
              <div className="d-flex flex-wrap justify-content-center">
                {productosPaginados.map((producto) => (
                  <div
                    key={producto.id}
                    className="card mb-4 me-3"
                    style={{ width: "200px" }} // Ajustar el ancho de la tarjeta al ancho de la imagen
                  >
                    {/* Imagen del producto */}
                    <img
                      src={producto.thumbnail}
                      className="card-img-top"
                      alt={producto.title}
                      style={{ cursor: "pointer", width: "200px", height: "auto" }} // Ancho fijo y altura automática
                    />
                    <div className="card-body">
                      {/* Encabezado del producto */}
                      <h5 className="card-title">{producto.title}</h5>
                      {/* Reseñas del producto */}
                      {producto.reviews && producto.reviews.length > 0 ? (
                        producto.reviews.map((resena, index) => (
                          <div key={index} className="mb-2">
                            <p className="mb-1">{generarEstrellas(resena.rating)}</p>
                            <p className="text-muted">{resena.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted">No hay reseñas para este producto.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Botones de paginación */}
              <nav>
                <ul className="pagination justify-content-center">
                  {botonesPaginacion}
                </ul>
              </nav>
            </>
          ) : (
            <p className="text-center">No se encontraron productos en esta categoría.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Resenias;