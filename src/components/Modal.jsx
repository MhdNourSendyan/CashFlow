import { useEffect, useState } from "react";
import Message from "./Message";
import IconClose from "../images/Close.svg";

// Componente funcional Modal que recibe ciertos props
function Modal({
  setModal,
  modalAnimate,
  setModalAnimate,
  saveExpense,
  editExpenses,
  setEditExpense,
}) {
  // Estados locales para manejar los datos del gasto
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  // Función para ocultar el modal
  const hideModal = () => {
    setModalAnimate(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
    setEditExpense({});
  };

  // Función para manejar el envío del formulario de gasto
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([name, amount, category].includes("")) {
      setMessage("Todos los campos son obligatorios");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }

    // Guardar el gasto utilizando la función saveExpense recibida como prop
    saveExpense({ name, amount, category, id, date });
  };

  // Efecto para cargar los datos del gasto a editar (si existen)
  useEffect(() => {
    if (Object.keys(editExpenses).length > 0) {
      setName(editExpenses.name);
      setAmount(editExpenses.amount);
      setCategory(editExpenses.category);
      setDate(editExpenses.date);
      setId(editExpenses.id);
    }
  }, []);

  // Componente Modal que muestra un formulario para agregar o editar gastos
  return (
    <div className="modal">
      <div className="close-modal ">
        {/* Botón para cerrar el modal */}
        <img src={IconClose} alt="close modal" onClick={hideModal} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`form ${modalAnimate ? "animate" : "close"}`}
      >
        {/* Título del formulario (Nuevo Gasto / Editar Gasto) */}
        <legend>{editExpenses.name ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {message && <Message type="error">{message}</Message>}
        {/* Campos del formulario para ingresar nombre, cantidad y categoría del gasto */}
        <div className="field">
          <label htmlFor="name">Nombre Gasto</label>
          <input
            type="text"
            id="name"
            placeholder="Añade el nombre del gasto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="amount">Cantidad del gasto</label>
          <input
            type="number"
            min={0}
            id="amount"
            placeholder="Cantidad"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div className="field">
          <label htmlFor="category">Categoría</label>
          {/* Selección de categoría del gasto */}
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Casa">Casa</option>
            <option value="Comida">Comida</option>
            <option value="GastosVarios">Gastos Varios</option>
            <option value="Ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="Suscripciones">Suscripciones</option>
          </select>
        </div>
        {/* Botón para enviar el formulario (Guardar Gasto / Añadir Gasto) */}
        <input
          type="submit"
          value={editExpenses.name ? "Guardar Gasto" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
}

// Exporta el componente Modal
export default Modal;
