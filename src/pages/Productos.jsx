import React, { useState, useEffect } from "react";
import FiltroCategorias from "../components/FiltroCategorias";
import ProductoCard from "../components/ProductoCard";
import ModalDescripcion from "../components/ModalDescripcion";
import ModalCarrito from "../components/ModalCarrito";
import ModalConfirmacion from "../components/ModalConfirmacion"; // nuevo modal

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("all");
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
  });
  const [modalDescripcion, setModalDescripcion] = useState("");
  const [productoAgregado, setProductoAgregado] = useState(null); // nuevo estado

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.products.filter(p => p.category !== "groceries");
        setProductos(filtrados);
        setCategorias([...new Set(filtrados.map(p => p.category))]);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const actualizarCantidadCarrito = (id, cantidad) => {
    setCarrito(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity: cantidad } : p))
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const agregarAlCarrito = (producto, cantidad) => {
    if (cantidad > 0) {
      setCarrito(prev => {
        const existente = prev.find(item => item.id === producto.id);
        return existente
          ? prev.map(item =>
              item.id === producto.id ? { ...item, quantity: cantidad } : item
            )
          : [...prev, { ...producto, quantity: cantidad }];
      });

      setProductoAgregado(producto); // mostrar modal de confirmación
    }
  };

  const productosFiltrados = filtroCategoria === "all"
    ? productos
    : productos.filter(p => p.category === filtroCategoria);

  return (
    <div className="container mt-4">
      <FiltroCategorias
        categorias={categorias}
        filtro={filtroCategoria}
        onChange={setFiltroCategoria}
      />
      <div className="row">
        {productosFiltrados.map(producto => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
            setModalDescripcion={setModalDescripcion}
            setProductoAgregado={setProductoAgregado} // nuevo prop
          />
        ))}
      </div>

      <ModalDescripcion descripcion={modalDescripcion} />
      <ModalCarrito
        carrito={carrito}
        actualizarCantidadCarrito={actualizarCantidadCarrito}
        eliminarDelCarrito={eliminarDelCarrito}
        vaciarCarrito={vaciarCarrito}
      />
      <ModalConfirmacion producto={productoAgregado} />
    </div>
  );
};

export default Productos;