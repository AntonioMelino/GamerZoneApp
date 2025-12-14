"use client";

import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";
import "./Counter.css";

const Counter = ({ item }) => {
  const [contador, setContador] = useState(1);
  const { addToCart } = useContext(CartContext);

  const sumar = () => {
    if (contador < item.stock) {
      setContador(contador + 1);
    } else {
      Swal.fire({
        title: "Stock máximo alcanzado",
        icon: "warning",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const restar = () => {
    if (contador > 1) {
      setContador(contador - 1);
    } else {
      Swal.fire({
        title: "Mínimo 1 producto",
        icon: "warning",
        confirmButtonText: "OK",
        background: "#1e293b",
        color: "#f1f5f9",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  const onAdd = () => {
    const objetoParaElCarrito = { ...item, quantity: contador };
    addToCart(objetoParaElCarrito);
    Swal.fire({
      title: "¡Producto agregado!",
      text: `${contador} ${
        contador === 1 ? "unidad agregada" : "unidades agregadas"
      } al carrito`,
      icon: "success",
      draggable: true,
      background: "#1e293b",
      color: "#f1f5f9",
      confirmButtonColor: "#6366f1",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="counter-container">
      <div className="counter-controls">
        <Button
          className="counter-button"
          variant="outlined"
          onClick={restar}
          startIcon={<RemoveIcon />}
          disabled={contador === 1}
        ></Button>
        <Typography className="counter-value" variant="h6" component="div">
          {contador}
        </Typography>
        <Button
          className="counter-button"
          variant="outlined"
          onClick={sumar}
          startIcon={<AddIcon />}
          disabled={contador === item.stock}
        ></Button>
      </div>
      <Button
        className="counter-add-button"
        variant="contained"
        color="primary"
        onClick={onAdd}
        startIcon={<ShoppingCartIcon />}
        fullWidth
      >
        Agregar al carrito
      </Button>
    </div>
  );
};

export default Counter;
