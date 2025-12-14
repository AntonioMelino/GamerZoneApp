"use client";

import { Link } from "react-router";
import { Button, Typography, Grid, Box, TextField } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./Cart.css";

// Función para formatear el precio
const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const Cart = () => {
  const { resetCart, cart, removeById, getTotalAmount } =
    useContext(CartContext);

  const total = getTotalAmount();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Función para vaciar el carrito con alerta de confirmación
  const resetCartWithAlert = () => {
    Swal.fire({
      title: "¿Seguro quieres vaciar el carrito?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      background: "var(--bg-card)",
      color: "var(--text-primary)",
      confirmButtonColor: "#6366f1",
      denyButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Carrito vaciado!",
          icon: "success",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          showConfirmButton: false,
        });
        resetCart();
      } else if (result.isDenied) {
        Swal.fire({
          title: "Carrito salvado!",
          icon: "info",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Función para eliminar un producto con alerta de confirmación
  const removeItemWithAlert = (id) => {
    Swal.fire({
      title: "¿Seguro quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`,
      background: "var(--bg-card)",
      color: "var(--text-primary)",
      confirmButtonColor: "#6366f1",
      denyButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Producto eliminado!",
          icon: "success",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          showConfirmButton: false,
        });
        removeById(id);
      } else if (result.isDenied) {
        Swal.fire({
          title: "Producto conservado!",
          icon: "info",
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="cart-container">
      <Typography className="cart-title" variant="h4" gutterBottom>
        <ShoppingBagIcon
          sx={{ fontSize: "2.5rem", marginBottom: "-8px", marginRight: "12px" }}
        />
        Carrito de compras
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.length > 0 ? (
            <>
              {cart.map((elemento) => (
                <Box key={elemento.id} className="cart-product-item">
                  <img
                    src={elemento.imageUrl || "/placeholder.svg"}
                    alt={elemento.title}
                    className="cart-product-image"
                  />
                  <Box className="cart-product-info">
                    <Typography className="cart-product-title" variant="h6">
                      {elemento.title}
                    </Typography>
                    <Typography className="cart-product-detail" variant="body1">
                      Cantidad: <strong>{elemento.quantity}</strong>
                    </Typography>
                    <Typography className="cart-product-detail" variant="body1">
                      Precio individual:{" "}
                      <span className="cart-product-price-highlight">
                        ${formatPrice(elemento.price)}
                      </span>
                    </Typography>
                    <Typography className="cart-product-detail" variant="body1">
                      Subtotal:{" "}
                      <span className="cart-product-price-highlight">
                        ${formatPrice(elemento.price * elemento.quantity)}
                      </span>
                    </Typography>
                  </Box>
                  <Button
                    className="cart-remove-button"
                    variant="outlined"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => removeItemWithAlert(elemento.id)}
                  >
                    Eliminar
                  </Button>
                </Box>
              ))}
            </>
          ) : (
            <Box sx={{ textAlign: "center", padding: "4rem 0" }}>
              <ShoppingBagIcon
                sx={{
                  fontSize: "6rem",
                  color: "var(--text-muted)",
                  marginBottom: "1rem",
                }}
              />
              <Typography className="cart-empty-message" variant="h5">
                No hay productos en el carrito
              </Typography>
              <Button
                component={Link}
                to="/"
                variant="contained"
                className="cart-button cart-button-primary"
                sx={{ marginTop: "2rem" }}
              >
                Explorar productos
              </Button>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className="cart-summary">
            <Typography
              className="cart-summary-title"
              variant="h5"
              gutterBottom
            >
              Resumen de compra
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box className="cart-summary-row">
                  <Typography variant="body1">
                    Productos ({totalItems}):
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ${formatPrice(total)}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box className="cart-summary-row">
                  <Typography variant="body1">Envío:</Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "var(--secondary-color)", fontWeight: 700 }}
                  >
                    GRATIS
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="cart-coupon-input"
                  fullWidth
                  label="Código de cupón"
                  variant="outlined"
                  size="small"
                  placeholder="Ingresa tu cupón"
                />
              </Grid>
              <Grid item xs={12}>
                <Box className="cart-summary-row cart-summary-total">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6">${formatPrice(total)}</Typography>
                </Box>
              </Grid>
            </Grid>

            <Box className="cart-action-buttons">
              <Button
                className="cart-button cart-button-primary"
                variant="contained"
                component={Link}
                to="/checkout"
                fullWidth
                disabled={cart.length === 0}
              >
                Finalizar compra
              </Button>
              <Button
                className="cart-button cart-button-secondary"
                variant="outlined"
                component={Link}
                to="/"
                fullWidth
              >
                Continuar comprando
              </Button>
              {cart.length > 0 && (
                <Button
                  className="cart-button cart-button-clear"
                  variant="outlined"
                  onClick={resetCartWithAlert}
                  fullWidth
                >
                  Vaciar carrito
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cart;
