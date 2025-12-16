"use client";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { Button, TextField, Typography, Box, Grid, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router";
import AuthGuard from "../../auth/authGuard/AuthGuard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Chekout.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const Checkout = () => {
  return (
    <AuthGuard
      redirectTo="/login"
      message="Para completar tu compra necesitas iniciar sesión con tu cuenta de GamerZoneApp"
    >
      <CheckoutContent />
    </AuthGuard>
  );
};

const CheckoutContent = () => {
  const { cart, getTotalAmount, resetCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderId) {
      navigate("/cart");
    }

    if (user) {
      setUserData((prev) => ({
        ...prev,
        email: user.email || "",
        nombre: user.displayName?.split(" ")[0] || "",
        apellido: user.displayName?.split(" ").slice(1).join(" ") || "",
      }));
    }
  }, [cart, navigate, orderId, user]);

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setLoading(true);

    if (
      !userData.nombre ||
      !userData.apellido ||
      !userData.email ||
      !userData.telefono
    ) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setError("Por favor, ingresa un email válido.");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userData.telefono)) {
      setError("Por favor, ingresa un teléfono válido (10 dígitos).");
      setLoading(false);
      return;
    }

    try {
      const total = getTotalAmount();
      const order = {
        buyer: userData,
        userId: user.uid,
        items: cart,
        total: total,
        createdAt: new Date().toISOString(),
        status: "pendiente",
      };

      const refCollection = collection(db, "orders");
      const res = await addDoc(refCollection, order);
      setOrderId(res.id);
      resetCart();

      const productsCollection = collection(db, "products");
      order.items.forEach(async (item) => {
        const productRef = doc(productsCollection, item.id);
        await updateDoc(productRef, { stock: item.stock - item.quantity });
      });
    } catch (error) {
      setError(
        "Hubo un error al procesar tu compra. Por favor, intenta nuevamente."
      );
      console.error("[v0] Error al procesar la compra:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (evento) => {
    const { value, name } = evento.target;
    setUserData({ ...userData, [name]: value });
    setError(null);
  };

  if (orderId) {
    return (
      <div className="checkout-container">
        <Box className="checkout-success">
          <div className="checkout-success-icon">
            <CheckCircleIcon />
          </div>
          <Typography
            className="checkout-success-title"
            variant="h4"
            gutterBottom
          >
            ¡Gracias por tu compra!
          </Typography>
          <Typography className="checkout-success-subtitle" variant="body1">
            Tu pedido ha sido procesado exitosamente
          </Typography>
          <Typography className="checkout-order-id" variant="h6">
            Número de orden:
            <div className="checkout-order-number">{orderId}</div>
          </Typography>
          <Typography className="checkout-success-info" variant="body2">
            Recibirás un correo de confirmación en {userData.email}
          </Typography>
          <Box className="checkout-success-actions">
            <Button
              className="checkout-back-button"
              variant="contained"
              component={Link}
              to="/"
            >
              Volver al inicio
            </Button>
            <Button
              className="checkout-profile-button"
              variant="outlined"
              component={Link}
              to="/profile"
            >
              Ver mi perfil
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <ShoppingCartIcon className="checkout-header-icon" />
        <Typography className="checkout-header-title" variant="h4">
          Finalizar compra
        </Typography>
        <Typography className="checkout-header-subtitle" variant="body1">
          Completa tus datos para procesar el pedido
        </Typography>
      </div>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        className="checkout-grid"
      >
        <Grid item xs={12} lg={6}>
          <div className="checkout-section">
            <Typography
              className="checkout-section-title"
              variant="h5"
              gutterBottom
            >
              Resumen de la compra
            </Typography>
            <div className="checkout-items-list">
              {cart.map((item) => (
                <Box key={item.id} className="checkout-summary-item">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.title}
                    className="checkout-item-image"
                  />
                  <Box className="checkout-item-details">
                    <Typography className="checkout-item-title" variant="body1">
                      {item.title}
                    </Typography>
                    <Typography
                      className="checkout-item-quantity"
                      variant="body2"
                    >
                      Cantidad: {item.quantity}
                    </Typography>
                  </Box>
                  <Typography className="checkout-item-price" variant="body1">
                    ${formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </div>
            <Box className="checkout-total">
              <Box className="checkout-total-row">
                <Typography className="checkout-total-label" variant="body1">
                  Subtotal:
                </Typography>
                <Typography className="checkout-total-value" variant="body1">
                  ${formatPrice(getTotalAmount())}
                </Typography>
              </Box>
              <Box className="checkout-total-row">
                <Typography className="checkout-total-label" variant="body1">
                  Envío:
                </Typography>
                <Typography className="checkout-total-free" variant="body1">
                  GRATIS
                </Typography>
              </Box>
              <Box className="checkout-total-row checkout-total-final">
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

        <Grid item xs={12} lg={6}>
          <div className="checkout-section">
            <Typography
              className="checkout-section-title"
              variant="h5"
              gutterBottom
            >
              Datos de contacto
            </Typography>
            <form onSubmit={handleSubmit} className="checkout-form">
              <TextField
                className="checkout-input"
                fullWidth
                label="Nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                required
              />
              <TextField
                className="checkout-input"
                fullWidth
                label="Apellido"
                name="apellido"
                value={userData.apellido}
                onChange={handleChange}
                required
              />
              <TextField
                className="checkout-input"
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <TextField
                className="checkout-input"
                fullWidth
                label="Teléfono (10 dígitos)"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                placeholder="1234567890"
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
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Confirmar compra"}
                </Button>
                <Button
                  className="checkout-button checkout-button-cancel"
                  type="button"
                  variant="outlined"
                  component={Link}
                  to="/cart"
                  disabled={loading}
                >
                  Volver al carrito
                </Button>
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
