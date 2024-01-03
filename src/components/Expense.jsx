import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatDate, formatQuantity } from "../helpers/index.js"; // Importación de funciones de ayuda para el formato

// Importación de iconos para cada categoría de gasto
import IconSaving from "../images/Saving.svg";
import IconHome from "../images/Home.svg";
import IconFood from "../images/Food.svg";
import IconBudget from "../images/Budget.svg";
import IconLeisure from "../images/Leisure.svg";
import IconHealth from "../images/Health.svg";
import IconSubscription from "../images/Subscription.svg";

// Diccionario que asigna un icono a cada categoría de gasto
const IconsDictionary = {
  Ahorro: IconSaving,
  Casa: IconHome,
  Comida: IconFood,
  GastosVarios: IconBudget,
  Ocio: IconLeisure,
  Salud: IconHealth,
  Suscripciones: IconSubscription,
};

// Componente funcional Expense que muestra un elemento de gasto con opciones de edición y eliminación al deslizar
function Expense({ expense, setEditExpense, deleteExpense }) {
  // Acciones a la izquierda del elemento deslizable (Editar)
  const leadingActions = (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setEditExpense(expense);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  // Acciones a la derecha del elemento deslizable (Eliminar)
  const trailingActions = (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          deleteExpense(expense.id);
        }}
        destructive={true} // Marca la acción como destructiva (eliminar)
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  // Componente SwipeableListItem que representa un elemento deslizable en la lista
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions}
        trailingActions={trailingActions}
      >
        <div className="expense shadow">
          <div className="expense-content">
            {/* Icono correspondiente a la categoría del gasto */}
            <img
              src={IconsDictionary[expense.category]}
              alt={`Icon ${expense.category}`}
            />
            <div className="expense-description">
              <p className="expense-category">{expense.category}</p>
              <p className="expense-name">{expense.name}</p>
              <p className="expense-date">
                Agregado el: {""}
                <span>{formatDate(expense.date)}</span>
              </p>
            </div>
          </div>
          {/* Monto del gasto */}
          <p className="expense-amount">{formatQuantity(expense.amount)}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default Expense;
