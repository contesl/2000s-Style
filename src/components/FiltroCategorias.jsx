const FiltroCategorias = ({ categorias, filtro, onChange }) => (
<div className="mb-4">
      <label htmlFor="categoriaFiltro" className="form-label">Seleccione la categoría o Todas:</label>
      <select
        id="categoriaFiltro"
        className="form-select"
        value={filtro}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">Todas</option>
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>{categoria}</option>
        ))}
      </select>
    </div>
  );
  
  export default FiltroCategorias;