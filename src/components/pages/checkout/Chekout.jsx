import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { Button, TextField, Typography, Box, Grid, Alert } from "@mui/material"; // Importar componentes de Material-UI
import { Link } from "react-router"; // Para redireccionar

// Función para formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const Checkout = () => {
  const { cart, getTotalAmount, resetCart } = useContext(CartContext);
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    // Validación básica
    if (!user.nombre || !user.apellido || !user.email || !user.telefono) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError("Por favor, ingresa un email válido.");
      return;
    }

    // Validación de teléfono
    const phoneRegex = /^\d{10}$/; // Ajusta según el formato de teléfono que necesites
    if (!phoneRegex.test(user.telefono)) {
      setError("Por favor, ingresa un teléfono válido (10 dígitos).");
      return;
    }

    try {
      let total = getTotalAmount();
      let order = {
        buyer: user,
        items: cart,
        total: total,
      };

      // Guardar la orden en Firestore
      let refCollection = collection(db, "orders");
      const res = await addDoc(refCollection, order);
      setOrderId(res.id);
      resetCart();

      // Actualizar el stock de los productos
      let productsCollection = collection(db, "products");
      order.items.forEach(async (item) => {
        let productRef = doc(productsCollection, item.id);
        await updateDoc(productRef, { stock: item.stock - item.quantity });
      });
    } catch (error) {
      setError(
        "Hubo un error al procesar tu compra. Por favor, intenta nuevamente."
      );
      console.error(error);
    }
  };

  const handleChange = (evento) => {
    const { value, name } = evento.target;
    setUser({ ...user, [name]: value });
    setError(null); // Limpiar errores al cambiar los campos
  };

  return (
    <div style={{ marginTop: "70px", padding: "20px" }}>
      {orderId ? (
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            ¡Gracias por tu compra!
          </Typography>
          <Typography variant="h6">
            Tu número de orden es: <strong>{orderId}</strong>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            sx={{ mt: 3 }}
          >
            Volver al inicio
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {/* Resumen de la compra */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Resumen de la compra
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} mb={2}>
                <Typography variant="body1">
                  {item.title} - {item.quantity} x ${formatPrice(item.price)}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6">
              Total: ${formatPrice(getTotalAmount())}
            </Typography>
          </Grid>

          {/* Formulario de checkout */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Completa tus datos
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={user.nombre}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Apellido"
                name="apellido"
                value={user.apellido}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Teléfono"
                name="telefono"
                value={user.telefono}
                onChange={handleChange}
                margin="normal"
                required
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Box mt={3} display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">
                  Comprar
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  component={Link}
                  to="/cart"
                >
                  Cancelar
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Checkout;
