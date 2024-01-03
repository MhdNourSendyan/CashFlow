import { useEffect, useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ExpensesList from "./components/ExpensesList.jsx";
import Filter from "./components/Filter.jsx";
import { generateId } from "./helpers/index.js";
import IconNewBudget from "./images/NewBudget.svg";

function App() {
  // Definición de estados utilizando useState hook
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAnimate, setModalAnimate] = useState(false);
  const [expenses, setExpenses] = useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses"))
      : []
  );
  const [editExpense, setEditExpense] = useState({});
  const [filter, setFilter] = useState(null);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // Función para mostrar el modal de nuevo gasto
  const handleNewExpense = () => {
    setModal(true);
    setTimeout(() => {
      setModalAnimate(true);
    }, 500);
  };

  // Función para guardar un nuevo gasto o actualizar uno existente
  const saveExpense = (expense) => {
    if (expense.id) {
      // Actualizar gasto existente
      const updatedExpenses = expenses.map((ex) =>
        ex.id === expense.id ? expense : ex
      );
      setExpenses(updatedExpenses);
      setEditExpense({});
    } else {
      // Crear nuevo gasto
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }
    setModalAnimate(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  // Efecto para abrir el modal de edición al editar un gasto
  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      handleNewExpense();
    }
  }, [editExpense]);

  // Función para eliminar un gasto
  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter((ex) => ex.id !== id);
    setExpenses(updatedExpenses);
  };

  // Efecto para actualizar el presupuesto en el almacenamiento local
  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  // Efecto para validar si hay un presupuesto válido en el almacenamiento local
  useEffect(() => {
    const budgetLS = Number(localStorage.getItem("budget")) ?? 0;
    if (budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);

  // Efecto para guardar los gastos en el almacenamiento local
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses) ?? []);
  }, [expenses]);

  // Efecto para filtrar los gastos por categoría
  useEffect(() => {
    if (filter) {
      const filteredExpenses = expenses.filter((ex) => ex.category === filter);
      setFilteredExpenses(filteredExpenses);
    }
  }, [filter]);

  // Componente principal de la aplicación
  return (
    <div className={modal ? "fixed" : ""}>
      <Header
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      {isValidBudget && (
        <>
          <main>
            <Filter filter={filter} setFilter={setFilter} />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filteredExpenses={filteredExpenses}
            />
          </main>
          <div className="new-expense">
            <img src={IconNewBudget} alt="icon" onClick={handleNewExpense} />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          modalAnimate={modalAnimate}
          setModalAnimate={setModalAnimate}
          saveExpense={saveExpense}
          editExpenses={editExpense}
          setEditExpense={setEditExpense}
        />
      )}
    </div>
  );
}

export default App;
