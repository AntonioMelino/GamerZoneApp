import { Link } from "react-router";
import { Button } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";

const Cart = () => {
  const {resetCart, cart, removeById, getTotalAmount} = useContext(CartContext);

  let total = getTotalAmount()

  return (
    <div>
      
      {cart.map((elemento) =>{
        return (
          <div key={elemento.id} style={{margin: "10px", width: "200px", border: "2px solid black"}}>
            <h2>{elemento.title}</h2>
            <h2>Cantidad: {elemento.quantity}</h2>
            <h2>Precio: {elemento.price}</h2>
            <Button variant="text" onClick={()=>removeById(elemento.id)}>
              Eliminar</Button>
          </div>
        );
      })}

      <h2>
        El total a pagar es {total}
      </h2>

    <Button variant="outlined" onClick={resetCart}>
      Vaciar carrito
    </Button>

    <Button variant="contained">
      <Link to="/checkout">finalizar compra</Link>
    </Button>

    </div>
  )
}

export default Cart