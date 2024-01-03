import { useState } from "react";
import Message from "./Message";

// Componente funcional NewBudget que recibe ciertos props
function NewBudget({ budget, setBudget, setIsValidBudget }) {
  // Estado local para manejar el mensaje de error
  const [message, setMessage] = useState("");

  // Función para manejar la definición del presupuesto
  const handleBudget = (e) => {
    e.preventDefault();

    // Validación del presupuesto ingresado por el usuario
    if (!budget || budget < 0) {
      setMessage("No es un presupuesto válido");
      return;
    }

    // Si el presupuesto es válido, se limpia el mensaje de error y se marca como válido
    setMessage("");
    setIsValidBudget(true);
  };

  // Componente NewBudget renderizado con un formulario para ingresar el presupuesto
  return (
    <div className="budget-container container shadow">
      <form onSubmit={handleBudget} className="form">
        <div className="field">
          <label htmlFor="">Definir Presupuesto</label>
          <input
            type="number"
            min={0}
            className="new-budget"
            placeholder="Añade tu presupuesto"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>
        <input type="submit" value="Añadir" />
        {/* Muestra el componente Message en caso de haber un mensaje de error */}
        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  );
}

// Exporta el componente NewBudget
export default NewBudget;
