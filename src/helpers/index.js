// Función para formatear una cantidad como valor monetario en dólares estadounidenses
export const formatQuantity = (quantity) => {
  // Utiliza la función toLocaleString para formatear la cantidad como moneda en USD
  return quantity.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

// Función para generar un identificador único
export const generateId = () => {
  // Generar una cadena aleatoria y convertirla a base 36
  const random = Math.random().toString(36).substr(2);
  // Obtener la fecha actual en formato numérico y convertirla a base 36
  const fecha = Date.now().toString(36);
  // Combinar la cadena aleatoria y la fecha para crear un identificador único
  return random + fecha;
};

// Función para formatear una fecha a un formato específico
export const formatDate = (date) => {
  // Crear un nuevo objeto de fecha a partir del argumento 'date'
  const newDate = new Date(date);
  // Opciones para el formato deseado de la fecha
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  // Formatear la fecha utilizando las opciones y devolverla en formato deseado
  return newDate.toLocaleDateString("es-Es", options);
};
