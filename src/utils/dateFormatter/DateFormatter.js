/**
 * Función para formatear fechas de órdenes
 * Maneja todos los formatos posibles: string ISO, Timestamp de Firebase, Date, etc.
 */
export const formatOrderDate = (dateInput) => {
  // Si no hay fecha, retornar mensaje
  if (!dateInput) {
    return "Fecha no disponible";
  }

  try {
    let date;

    // 1. String ISO (ej: "2025-12-24T23:04:48.580Z")
    if (typeof dateInput === "string") {
      date = new Date(dateInput);
    }

    // 2. Timestamp de Firebase con método toDate()
    else if (dateInput && typeof dateInput === "object" && dateInput.toDate) {
      date = dateInput.toDate();
    }

    // 3. Timestamp de Firebase serializado ({_seconds, _nanoseconds})
    else if (
      dateInput &&
      typeof dateInput === "object" &&
      dateInput._seconds !== undefined
    ) {
      date = new Date(dateInput._seconds * 1000);
      // Agregar nanosegundos si existen
      if (dateInput._nanoseconds) {
        date = new Date(
          dateInput._seconds * 1000 +
            Math.floor(dateInput._nanoseconds / 1000000)
        );
      }
    }

    // 4. Ya es objeto Date
    else if (dateInput instanceof Date) {
      date = dateInput;
    }

    // 5. Número (timestamp en milisegundos)
    else if (typeof dateInput === "number") {
      date = new Date(dateInput);
    }

    // 6. Último intento
    else {
      date = new Date(dateInput);
    }

    // Validar que la fecha sea válida
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    // Formatear la fecha en español
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error al formatear fecha:", error);
    return "Fecha no disponible";
  }
};
