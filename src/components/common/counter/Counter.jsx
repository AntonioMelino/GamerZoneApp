import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Typography } from "@mui/material";

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
      });
    }
  };

  const onAdd = () => {
    let objetoParaElCarrito = { ...item, quantity: contador };
    addToCart(objetoParaElCarrito);
    Swal.fire({
      title: "Producto agregado!",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Button
          variant="outlined"
          onClick={restar}
          startIcon={<RemoveIcon />}
          disabled={contador === 1}
        ></Button>
        <Typography variant="h6" component="div">
          {contador}
        </Typography>
        <Button
          variant="outlined"
          onClick={sumar}
          startIcon={<AddIcon />}
          disabled={contador === item.stock}
        ></Button>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onAdd}
        startIcon={<ShoppingCartIcon />}
        fullWidth
      >
        AGREGAR AL CARRITO
      </Button>
    </div>
  );
};

export default Counter;
