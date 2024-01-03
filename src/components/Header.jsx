import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";

// Componente funcional Header que recibe ciertos props
function Header({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  expenses,
  setExpenses,
}) {
  return (
    // Elemento de encabezado
    <header>
      <h1>Control de Gastos</h1>
      {/* Condicional para renderizar el componente BudgetControl o NewBudget */}
      {isValidBudget ? (
        // Si hay un presupuesto válido, muestra el componente BudgetControl
        <BudgetControl
          budget={budget}
          setBudget={setBudget}
          expenses={expenses}
          setExpenses={setExpenses}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        // Si no hay un presupuesto válido, muestra el componente NewBudget
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
}

// Exporta el componente Header
export default Header;
