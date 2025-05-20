import React from 'react';
import personalstyle from "/src/img/PersonalStyle.jpg";
const Inicio = () => {
  return (
    <main>
      <figure className="contenedorImagen centered">
        <img id="imagen-index" src={personalstyle} alt="Personal Style" />
      </figure>
    </main>
  );
};

export default Inicio;
