// Componente ModalCarrito
// Recibe como props:
// - carrito: lista de productos en el carrito
// - actualizarCantidadCarrito: función para cambiar la cantidad de un producto
// - eliminarDelCarrito: función para eliminar un producto específico
// - vaciarCarrito: función para vaciar el carrito completo
const ModalCarrito = ({
  carrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
  vaciarCarrito,
}) => {
  // Se calcula el total sumando el precio * cantidad de cada producto
  const total = carrito.reduce(
    (acc, prod) => acc + prod.price * prod.quantity,
    0
  );

  return (
    // Estructura del modal de Bootstrap
    <div
      className="modal fade"
      id="carritoModal"                     // ID único del modal para activarlo desde un botón
      tabIndex="-1"
      aria-labelledby="carritoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg"> {/* Modal grande para más espacio */}
        <div className="modal-content">
          
          {/* Encabezado del modal */}
          <div className="modal-header">
            <h5 className="modal-title" id="carritoModalLabel">
              Carrito de Compras
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"       // Cierra el modal al hacer clic
              aria-label="Cerrar"
            ></button>
          </div>

          {/* Cuerpo del modal: muestra tabla de productos o mensaje si está vacío */}
          <div className="modal-body">
            {carrito.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Iteramos sobre cada producto del carrito */}
                  {carrito.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.title}</td>

                      {/* Campo para modificar la cantidad */}
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={producto.quantity}
                          className="form-control"
                          onChange={(e) =>
                            actualizarCantidadCarrito(
                              producto.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </td>

                      {/* Precio unitario y subtotal */}
                      <td>${producto.price.toFixed(2)}</td>
                      <td>${(producto.price * producto.quantity).toFixed(2)}</td>

                      {/* Botón para eliminar producto */}
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarDelCarrito(producto.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // Si el carrito está vacío
              <p className="text-center">El carrito está vacío.</p>
            )}
          </div>

          {/* Pie del modal con total y acciones */}
          <div className="modal-footer d-flex justify-content-between">
            {/* Total solo si hay productos */}
            {carrito.length > 0 && (
              <h5>Total: ${total.toFixed(2)}</h5>
            )}
            <div>
              {/* Botón para vaciar el carrito */}
              <button
                className="btn btn-warning me-2"
                onClick={vaciarCarrito}
              >
                Vaciar Carrito
              </button>

              {/* Botón para cerrar el modal */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalCarrito;
