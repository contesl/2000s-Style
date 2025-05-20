import React, { useState } from 'react';

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });

  const [errores, setErrores] = useState({});

  const [enviado, setEnviado] = useState(false);

  // Función para manejar los cambios en los campos del formulario
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Función para validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }

    if (!formulario.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(formulario.correo)) {
      nuevosErrores.correo = 'El correo electrónico no es válido.';
    }

    if (!formulario.mensaje.trim()) {
      nuevosErrores.mensaje = 'El mensaje es obligatorio.';
    } else if (formulario.mensaje.length < 10) {
      nuevosErrores.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return nuevosErrores;
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length === 0) {
      setEnviado(true);
      setErrores({});
      console.log('Formulario enviado:', formulario);
      // Aquí podrías enviar los datos a un servidor o API
    } else {
      setErrores(nuevosErrores);
      setEnviado(false);
    }
  };

  return (
    <div>
      <h1>Contacto</h1>
      <form onSubmit={manejarEnvio} className="formulario-contacto">
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>
        <div>
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formulario.correo}
            onChange={manejarCambio}
          />
          {errores.correo && <p className="error">{errores.correo}</p>}
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formulario.mensaje}
            onChange={manejarCambio}
          ></textarea>
          {errores.mensaje && <p className="error">{errores.mensaje}</p>}
        </div>
        <button type="submit">Enviar</button>
        {enviado && <p className="exito">¡Formulario enviado con éxito!</p>}
      </form>
    </div>
  );
};

export default Contacto;