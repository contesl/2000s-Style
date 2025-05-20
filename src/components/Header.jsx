import React from 'react';
import banner from "/src/img/PersonalStyle-Banner.jpg";

const Header = () => {
  return (
    <header>
      <figure className="contenedorImagen">
        <img id="imagen-index" src={banner} alt="Banner" />
      </figure>
    </header>
  );
};

export default Header;