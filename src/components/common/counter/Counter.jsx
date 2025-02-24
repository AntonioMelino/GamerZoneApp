import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import Swal from "sweetalert2";

const Counter = ({ item }) => {
  const [contador, setContador] = useState(1);
  const { addToCart } = useContext(CartContext);

  const sumar = () => {
    if (contador < item.stock) {
      setContador(contador + 1);
    } else {
      alert("stock maximo");
    }
  };

  const restar = () => {
    if (contador > 1) {
      setContador(contador - 1);
    } else {
      alert("minimo 1 producto");
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
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={restar}>restar</button>
        <h2>{contador}</h2>
        <button onClick={sumar}>sumar</button>
      </div>
      <button onClick={onAdd}>Agregar al carrito</button>
    </div>
  );
};

export default Counter;
