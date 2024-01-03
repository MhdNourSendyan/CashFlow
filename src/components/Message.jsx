// Componente funcional Message para mostrar mensajes de alerta
function Message({ children, type }) {
  return <div className={`alert ${type}`}>{children}</div>;
}

export default Message;
