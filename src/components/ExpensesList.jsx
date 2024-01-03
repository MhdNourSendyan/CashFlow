import Expense from "./Expense";

// Componente funcional ExpensesList que muestra una lista de gastos
function ExpensesList({
  expenses,
  setEditExpense,
  deleteExpense,
  filter,
  filteredExpenses,
}) {
  return (
    <div className="expnse-list container">
      {/* Verifica si hay un filtro aplicado */}
      {filter ? (
        <>
          {/* Título condicional dependiendo de si hay gastos filtrados */}
          <h2>
            {filteredExpenses.length
              ? "Gastos"
              : "No Hay Gastos En Esta Categoría"}
          </h2>
          {/* Renderiza cada gasto filtrado utilizando el componente Expense */}
          {filteredExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      ) : (
        <>
          {/* Título condicional dependiendo de si hay gastos */}
          <h2>{expenses.length ? "Gastos" : "No Hay Gastos Aún"}</h2>
          {/* Renderiza cada gasto utilizando el componente Expense */}
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default ExpensesList;
