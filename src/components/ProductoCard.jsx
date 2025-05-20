const ProductoCard = ({ producto, agregarAlCarrito, setModalDescripcion }) => {
    const handleClick = () => {
      const input = document.getElementById(`cantidadProducto${producto.id}`);
      const cantidad = parseInt(input.value, 10);
      agregarAlCarrito(producto, cantidad);
    };
  
    return (
      <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
        <div className="card h-100">
          <img
            src={producto.thumbnail}
            className="card-img-top"
            alt={producto.title}
            style={{ cursor: "pointer" }}
            onClick={() => setModalDescripcion(producto.description)}
            data-bs-toggle="modal"
            data-bs-target="#descripcionModal"
          />
          <div className="card-body">
            <p>{producto.title}</p>
            <p><strong>Precio:</strong> ${producto.price.toFixed(2)}</p>
            <div className="d-flex align-items-center">
              <label htmlFor={`cantidadProducto${producto.id}`} className="me-2">Cantidad:</label>
              <input
                type="number"
                id={`cantidadProducto${producto.id}`}
                className="form-control me-2"
                style={{ width: "120px" }}
                min="1"
                defaultValue="1"
              />
              <button className="btn btn-sm btn-primary" onClick={handleClick}>Comprar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductoCard;