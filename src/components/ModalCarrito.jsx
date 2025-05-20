const ModalCarrito = ({
    carrito,
    actualizarCantidadCarrito,
    eliminarDelCarrito,
    vaciarCarrito,
  }) => {
    const total = carrito.reduce(
      (acc, prod) => acc + prod.price * prod.quantity,
      0
    );
  
    return (
      <div className="modal fade" id="carritoModal" tabIndex="-1" aria-labelledby="carritoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="carritoModalLabel">Carrito de Compras</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
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
                    {carrito.map((producto) => (
                      <tr key={producto.id}>
                        <td>{producto.title}</td>
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
                        <td>${producto.price.toFixed(2)}</td>
                        <td>${(producto.price * producto.quantity).toFixed(2)}</td>
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
                <p className="text-center">El carrito está vacío.</p>
              )}
            </div>
            <div className="modal-footer d-flex justify-content-between">
              {carrito.length > 0 && (
                <h5>Total: ${total.toFixed(2)}</h5>
              )}
              <div>
                <button className="btn btn-warning me-2" onClick={vaciarCarrito}>Vaciar Carrito</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalCarrito;