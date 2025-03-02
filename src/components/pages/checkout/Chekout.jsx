import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";

const Chekout = () => {
  const { cart, getTotalAmount, resetCart } = useContext(CartContext);

  const [user, setUser] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const [orderId, setOrderId] = useState(null);

  const handleSubmit = (evento) => {
    evento.preventDefault();

    let total = getTotalAmount();
    let order = {
      buyer: user,
      items: cart,
      total: total,
    };

    let refCollection = collection(db, "orders");
    const promiseResponse = addDoc(refCollection, order);
    promiseResponse
      .then((res) => {
        setOrderId(res.id);
        resetCart();
      })
      .catch((error) => console.log({ error }));

    let productsCollection = collection(db, "products");
    order.items.forEach((item) => {
      let productRef = doc(productsCollection, item.id);
      updateDoc(productRef, { stock: item.stock - item.quantity });
    });
  };

  const handleChange = (evento) => {
    const { value, name } = evento.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      {orderId ? (
        <h2>Gracias por tu compra tu ticket es {orderId}</h2>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="nombre"
            name="nombre"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="telefono"
            name="telefono"
            onChange={handleChange}
          />

          <button>Comprar</button>
          <button type="button">Cancelar</button>
        </form>
      )}
    </div>
  );
};

export default Chekout;
