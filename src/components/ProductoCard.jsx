import { Link } from "react-router-dom";

// Componente que representa una tarjeta individual de producto
// Props:
// - producto: objeto con los datos del producto (id, title, price, thumbnail, etc.)
// - agregarAlCarrito: función para agregar un producto con cantidad al carrito
const ProductoCard = ({ producto, agregarAlCarrito }) => {

  // Maneja el evento de hacer clic en "Comprar"
  const handleClick = () => {
    // Obtiene el input asociado al producto por su ID dinámico
    const input = document.getElementById(`cantidadProducto${producto.id}`);
    // Parsea la cantidad seleccionada
    const cantidad = parseInt(input.value, 10);
    // Llama a la función para agregar al carrito
    agregarAlCarrito(producto, cantidad);
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        
        {/* Imagen del producto con enlace dinámico al detalle del producto */}
        {/* Link redirige a la ruta /productos/:id usando React Router */}
        <Link to={`/productos/${producto.id}`}>
          <img
            src={producto.thumbnail}        // Muestra la imagen del producto
            className="card-img-top"
            alt={producto.title}
            style={{ cursor: "pointer" }}
          />
        </Link>

        {/* Cuerpo de la tarjeta con información del producto */}
        <div className="card-body">
          <p>{producto.title}</p>           {/* Nombre del producto */}
          <p><strong>Precio:</strong> ${producto.price.toFixed(2)}</p>

          {/* Sección de cantidad y botón para agregar al carrito */}
          <div className="d-flex align-items-center">
            <label htmlFor={`cantidadProducto${producto.id}`} className="me-2">Cantidad:</label>
            <input
              type="number"                         // Campo numérico para cantidad
              id={`cantidadProducto${producto.id}`} // ID único por producto
              className="form-control me-2"
              style={{ width: "120px" }}
              min="1"
              defaultValue="1"                      // Valor inicial
            />
            <button className="btn btn-sm btn-primary" onClick={handleClick}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoCard;
