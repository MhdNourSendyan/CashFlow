// Componente funcional Filter que maneja el filtrado de gastos por categoría
function Filter({ filter, setFilter }) {
  return (
    <div className="filter shadow container">
      {/* Formulario con menú desplegable para filtrar gastos por categoría */}
      <form>
        <div className="field">
          <label>Filtrar Gastos</label>
          {/* Menú desplegable que maneja el estado del filtro */}
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">-- Todas las categorías --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Casa">Casa</option>
            <option value="Comida">Comida</option>
            <option value="GastosVarios">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filter;
