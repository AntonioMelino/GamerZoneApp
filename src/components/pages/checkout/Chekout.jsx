"use client";

import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { Button, TextField, Typography, Box, Grid, Alert } from "@mui/material";
import { Link } from "react-router";
import "./Chekout.css";

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
  const [error, setError] = useState(null);

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
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(user.telefono)) {
      setError("Por favor, ingresa un teléfono válido (10 dígitos).");
      return;
    }

    try {
      const total = getTotalAmount();
      const order = {
        buyer: user,
        items: cart,
        total: total,
      };

      // Guardar la orden en Firestore
      const refCollection = collection(db, "orders");
      const res = await addDoc(refCollection, order);
      setOrderId(res.id);
      resetCart();

      // Actualizar el stock de los productos
      const productsCollection = collection(db, "products");
      order.items.forEach(async (item) => {
        const productRef = doc(productsCollection, item.id);
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
    setError(null);
  };

  return (
    <div className="checkout-container">
      {orderId ? (
        <Box className="checkout-success">
          <Typography
            className="checkout-success-title"
            variant="h4"
            gutterBottom
          >
            ¡Gracias por tu compra!
          </Typography>
          <Typography className="checkout-order-id" variant="h6">
            Tu número de orden es:
            <div className="checkout-order-number">{orderId}</div>
          </Typography>
          <Button
            className="checkout-back-button"
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            Volver al inicio
          </Button>
        </Box>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          className="checkout-grid"
        >
          {/* Resumen de la compra */}
          <Grid item xs={12} md={6}>
            <div className="checkout-section">
              <Typography
                className="checkout-section-title"
                variant="h5"
                gutterBottom
              >
                Resumen de la compra
              </Typography>
              {cart.map((item) => (
                <Box key={item.id} className="checkout-summary-item">
                  <Box>
                    <Typography
                      className="checkout-summary-text"
                      variant="body1"
                      sx={{ fontWeight: 600 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      className="checkout-summary-text"
                      variant="body2"
                    >
                      Cantidad: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography
                    className="checkout-summary-price"
                    variant="body1"
                  >
                    ${formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
              <Box className="checkout-total">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography className="checkout-total-text" variant="h6">
                    Total:
                  </Typography>
                  <Typography className="checkout-total-amount" variant="h6">
                    ${formatPrice(getTotalAmount())}
                  </Typography>
                </Box>
              </Box>
            </div>
          </Grid>

          {/* Formulario de checkout */}
          <Grid item xs={12} md={6}>
            <div className="checkout-section">
              <Typography
                className="checkout-section-title"
                variant="h5"
                gutterBottom
              >
                Completa tus datos
              </Typography>
              <form onSubmit={handleSubmit} className="checkout-form">
                <TextField
                  className="checkout-input"
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleChange}
                  required
                />
                <TextField
                  className="checkout-input"
                  fullWidth
                  label="Apellido"
                  name="apellido"
                  value={user.apellido}
                  onChange={handleChange}
                  required
                />
                <TextField
                  className="checkout-input"
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  className="checkout-input"
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={user.telefono}
                  onChange={handleChange}
                  required
                />

                {error && (
                  <Alert severity="error" className="checkout-error">
                    {error}
                  </Alert>
                )}

                <Box className="checkout-actions">
                  <Button
                    className="checkout-button checkout-button-primary"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Confirmar compra
                  </Button>
                  <Button
                    className="checkout-button checkout-button-cancel"
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
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Checkout;
