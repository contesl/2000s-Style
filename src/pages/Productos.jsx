// Importaciones de React y hooks
import React, { useState, useEffect } from "react";

// Importación de componentes utilizados en esta vista
import FiltroCategorias from "../components/FiltroCategorias";   // Componente para filtrar productos por categoría
import ProductosConPaginacion from "../components/ProductosConPaginacion"; // Nuevo componente para manejar la paginación
import ModalCarrito from "../components/ModalCarrito";           // Modal para ver y gestionar el carrito
import ModalConfirmacion from "../components/ModalConfirmacion"; // Modal para confirmar que un producto fue agregado al carrito

// Componente principal de la página de productos
const Productos = () => {
  // Estado para almacenar todos los productos
  const [productos, setProductos] = useState([]);

  // Estado para almacenar todas las categorías disponibles
  const [categorias, setCategorias] = useState([]);

  // Estado que indica cuál es la categoría seleccionada para filtrar productos
  const [filtroCategoria, setFiltroCategoria] = useState("all");

  // Estado del carrito; se inicializa desde sessionStorage si hay datos guardados
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(sessionStorage.getItem("carrito")) || [];
  });

  // Estado que almacena temporalmente el producto recién agregado (para mostrar confirmación)
  const [productoAgregado, setProductoAgregado] = useState(null);

  // Estado para mostrar errores durante la carga de productos
  const [error, setError] = useState(null);

  // useEffect para cargar productos desde la API cuando el componente se monta
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("https://683b11bb43bb370a8674a595.mockapi.io/2000s-style/products");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Se filtran los productos para excluir la categoría "groceries" si es necesario
        const filtrados = data.filter(p => p.category !== "groceries");

        // Se actualiza el estado con los productos y las categorías únicas
        setProductos(filtrados);
        setCategorias([...new Set(filtrados.map(p => p.category))]);
        setError(null); // Limpiar errores previos si la carga fue exitosa
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("Hubo un problema al cargar los productos. Intenta nuevamente más tarde.");
      }
    };

    fetchProductos(); // Se ejecuta la función de carga al montar el componente
  }, []);

  // useEffect para guardar el estado del carrito en sessionStorage cada vez que cambia
  useEffect(() => {
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Función para actualizar la cantidad de un producto específico en el carrito
  const actualizarCantidadCarrito = (id, cantidad) => {
    setCarrito(prev =>
      prev.map(p => (p.id === id ? { ...p, quantity: cantidad } : p))
    );
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  // Función para vaciar completamente el carrito
  const vaciarCarrito = () => setCarrito([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto, cantidad) => {
    if (cantidad > 0) {
      setCarrito(prev => {
        const existente = prev.find(item => item.id === producto.id);

        // Si el producto ya está en el carrito, se actualiza la cantidad
        // Si no, se agrega al carrito
        return existente
          ? prev.map(item =>
              item.id === producto.id ? { ...item, quantity: cantidad } : item
            )
          : [...prev, { ...producto, quantity: cantidad }];
      });

      // Se actualiza el estado para mostrar el modal de confirmación
      setProductoAgregado(producto);
    }
  };

  // Se filtran los productos en función de la categoría seleccionada
  const productosFiltrados = filtroCategoria === "all"
    ? productos
    : productos.filter(p => p.category === filtroCategoria);

  // Renderizado del componente
  return (
    <div className="container mt-4">
      {/* Si hay un error al cargar los productos, se muestra un mensaje */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <h1>Catálogo y Compra en Linea</h1>
      {/* Componente para elegir la categoría de productos */}
      <FiltroCategorias
        categorias={categorias}
        filtro={filtroCategoria}
        onChange={setFiltroCategoria}
      />

      {/* Lista de productos con paginación */}
      <ProductosConPaginacion
        productos={productosFiltrados} // Pasar los productos filtrados
        agregarAlCarrito={agregarAlCarrito} // Pasar la función para agregar al carrito
      />

      {/* Modal para ver el contenido del carrito y realizar acciones */}
      <ModalCarrito
        carrito={carrito}
        actualizarCantidadCarrito={actualizarCantidadCarrito}
        eliminarDelCarrito={eliminarDelCarrito}
        vaciarCarrito={vaciarCarrito}
      />

      {/* Modal para confirmar que se agregó un producto al carrito */}
      <ModalConfirmacion producto={productoAgregado} />
    </div>
  );
};

export default Productos;