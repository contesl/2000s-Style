import React, { useEffect } from "react";

const ModalConfirmacion = ({ producto }) => {
  useEffect(() => {
    if (producto) {
      const modal = new window.bootstrap.Modal(document.getElementById("confirmacionModal"));
      modal.show();
    }
  }, [producto]);

  return (
    <div
      className="modal fade"
      id="confirmacionModal"
      tabIndex="-1"
      aria-labelledby="confirmacionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmacionModalLabel">Producto agregado</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div className="modal-body">
            <p className="mb-2">✅ El producto fue agregado al carrito.</p>
            {producto && (
              <>
                <p><strong>{producto.title}</strong></p>
                <p className="text-muted">{producto.description}</p>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;