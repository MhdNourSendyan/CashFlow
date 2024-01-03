import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatQuantity } from "../helpers/index.js";

// Componente funcional BudgetControl que recibe ciertos props
function BudgetControl({
  budget,
  setBudget,
  expenses,
  setExpenses,
  setIsValidBudget,
}) {
  // Estados locales para manejar el disponible, gastado y porcentaje
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // Efecto para calcular el disponible, gastado y porcentaje cuando cambian los gastos
  useEffect(() => {
    const totalSpent = expenses.reduce(
      (total, expense) => expense.amount + total,
      0
    );
    const totalAvailable = budget - totalSpent;
    setAvailable(totalAvailable);
    setSpent(totalSpent);

    // Calcular el porcentaje gastado del presupuesto
    const newPercentage = ((budget - totalAvailable) / budget) * 100;
    setTimeout(() => {
      setPercentage(newPercentage);
    }, 500);
  }, [expenses]);

  // Función para reiniciar el presupuesto y gastos
  const handleResetApp = () => {
    const message = window.confirm("¿Deseas reiniciar presupuesto y gastos?");
    if (message) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  };

  // Componente BudgetControl con visualización de gráfico circular y detalles del presupuesto
  return (
    <div className="budget-container container shadow columns">
      {/* Gráfico circular para mostrar el porcentaje gastado */}
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F5F5F5",
            textSize: "1rem",
            textColor: percentage > 100 ? "#DC2626" : "#3B82F6",
          })}
          value={percentage}
          text={`${percentage.toFixed(2)}% Gastado`}
        />
      </div>
      {/* Detalles del presupuesto y gastos */}
      <div className="budget-content">
        <button type="button" className="reset-app" onClick={handleResetApp}>
          Restear App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatQuantity(budget)}
        </p>
        <p className={`${available < 0 ? "negative" : ""}`}>
          <span>Disponible: </span>
          {formatQuantity(available)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatQuantity(spent)}
        </p>
      </div>
    </div>
  );
}

// Exporta el componente BudgetControl
export default BudgetControl;
