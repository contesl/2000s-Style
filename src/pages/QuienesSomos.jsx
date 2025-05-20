import React from 'react';

const QuienesSomos = () => {
  return (
    <main>
      <article className="main-container">
        <section className="section-container">
          <h1>¿Quién es 2000s Style?</h1>
          <br />
          <h2>Bienvenida/o a 2000s STYLE en Línea</h2>
          <br />
          <p>
            Nacimos en 1960 con el concepto de <b><i>moda rápida:</i></b> todo tipo de objetos personales asequibles y
            listos para usar basados en los últimos diseños de alta gama.
          </p>
          <p>
            Proveemos <b><i>lo mejor</i></b> de los objetos y accesorios que anticipan las tendencias futuras{' '}
            <b><i>a precios alcanzables para todos</i></b>.
          </p>
          <p>¡Disfrute!</p>
          <p>Diego Leonel Bochini</p>
          <p>Presidente, SportsPro</p>
        </section>
        <div className="embed-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9288.92505041785!2d-58.39111493845885!3d-34.600850143177766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sTeatro%20Col%C3%B3n!5e0!3m2!1ses!2sar!4v1710158476038!5m2!1ses!2sar"
            frameBorder="0"
            allowFullScreen
            title="Ubicación"
          ></iframe>
        </div>
      </article>
    </main>
  );
};

export default QuienesSomos;