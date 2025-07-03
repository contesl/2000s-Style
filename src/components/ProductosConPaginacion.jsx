import React, { useState } from "react";
import ProductoCard from "./ProductoCard"; // Importar el componente ProductoCard

const ProductosConPaginacion = ({ productos, agregarAlCarrito }) => {
  const [paginaActual, setPaginaActual] = useState(1); // Estado para manejar la página actual
  const productosPorPagina = 4; // Número de productos por página

  // Calcular los productos a mostrar en la página actual
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPaginados = productos.slice(indicePrimerProducto, indiceUltimoProducto);

  // Cambiar de página
  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  // Generar botones de paginación
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const botonesPaginacion = [];
  for (let i = 1; i <= totalPaginas; i++) {
    botonesPaginacion.push(
      <li key={i} className={`page-item ${paginaActual === i ? "active" : ""}`}>
        <button className="page-link" onClick={() => cambiarPagina(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {productosPaginados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
      {/* Botones de paginación */}
      <nav>
        <ul className="pagination justify-content-center">
          {botonesPaginacion}
        </ul>
      </nav>
    </div>
  );
};

export default ProductosConPaginacion;