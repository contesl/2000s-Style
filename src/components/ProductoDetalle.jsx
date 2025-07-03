import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/products/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProducto(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducto();
  }, [id]);

  const cerrarDetalle = () => {
    navigate(-1);
  };

  if (error) return <p className="text-danger">{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="overlay">
      <div className="product-card">
        <button onClick={cerrarDetalle} className="close-button">×</button>
        <h2>{producto.title}</h2>
        <img src={producto.thumbnail} alt={producto.title} style={{ maxWidth: "100%" }} />
        <p><strong>Precio:</strong> ${producto.price.toFixed(2)}</p>
        <p>{producto.description}</p>
      </div>
    </div>
  );
};

export default ProductoDetalle;
