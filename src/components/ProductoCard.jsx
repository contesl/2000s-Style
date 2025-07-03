import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext"; // Importar el contexto de autenticación

const ProductoCard = ({ producto, agregarAlCarrito }) => {
  const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
      return;
    }

    const input = document.getElementById(`cantidadProducto${producto.id}`);
    const cantidad = parseInt(input.value, 10);
    agregarAlCarrito(producto, cantidad);
  };

  const handleRedirectToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="col-12 col-md-3 mb-4"> {/* Ajustar el diseño responsivo */}
      <div
        className="card h-100"
        style={{
          margin: "0 auto", // Centrar la tarjeta
          width: "200px", // Ajustar el ancho de la tarjeta al tamaño de la imagen
        }}
      >
        <Link to={`/productos/${producto.id}`}>
          <img
            src={producto.thumbnail}
            className="card-img-top"
            alt={producto.title}
            style={{
              cursor: "pointer",
              width: "200px", // Ajustar el ancho de la imagen
              height: "200px", // Ajustar la altura de la imagen
              objectFit: "cover", // Asegurar que la imagen se recorte correctamente
            }}
          />
        </Link>
        <div className="card-body" style={{ textAlign: "center" }}>
          <p>{producto.title}</p>
          <p>
            <strong>Precio:</strong> ${producto.price.toFixed(2)}
          </p>
          <div className="d-flex flex-column align-items-center">
            <label
              htmlFor={`cantidadProducto${producto.id}`}
              className="mb-2"
            >
              Cantidad a Comprar:
            </label>
            <input
              type="number"
              id={`cantidadProducto${producto.id}`}
              className="form-control mb-2"
              style={{
                width: "100%",
                maxWidth: "150px",
                textAlign: "center",
              }}
              min="1"
              defaultValue="1"
            />
            <button
              className="btn btn-sm btn-primary"
              onClick={handleClick}
              style={{ width: "100%", maxWidth: "150px" }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Atención</h5>
                <button
                 type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Debes iniciar sesión para comprar productos.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleRedirectToLogin}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductoCard;