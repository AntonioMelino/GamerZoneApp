import cart from "../../../assets/cart-shopping-solid.svg";

const CartWidget = () => {
  return (
    <div>
      <img src={cart} alt="Carrito de compras" style={{ width: "30px", height: "30px" }} />
      <span style={{ fontSize: "16px", fontWeight: "bold" }}>5</span>
    </div>
  )
}

export default CartWidget