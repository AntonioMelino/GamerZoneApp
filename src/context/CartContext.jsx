import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Cargar datos desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedOrders = localStorage.getItem("orders");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("[v0] Error al cargar carrito:", error);
        localStorage.removeItem("cart");
      }
    }

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("[v0] Error al cargar órdenes:", error);
        localStorage.removeItem("orders");
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Guardar órdenes en localStorage cuando cambian
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      localStorage.removeItem("orders");
    }
  }, [orders]);

  const addToCart = (product) => {
    let existe = cart.some((elemento) => elemento.id === product.id);
    if (existe) {
      const nuevoArray = cart.map((elemento) => {
        if (product.id === elemento.id) {
          return {
            ...elemento,
            quantity: elemento.quantity + product.quantity,
          };
        } else {
          return elemento;
        }
      });
      setCart(nuevoArray);
    } else {
      setCart([...cart, product]);
    }
  };

  const removeById = (id) => {
    const newArray = cart.filter((elemento) => elemento.id !== id);
    setCart(newArray);
  };

  const resetCart = () => {
    setCart([]);
  };

  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity * elemento.price;
    }, 0);
    return total;
  };

  const getTotalQuantity = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity;
    }, 0);
    return total;
  };

  // Función para crear una nueva orden (checkout)
  const createOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      items: [...cart], // Copia del carrito actual
      total: getTotalAmount(),
      status: "completed",
      shippingAddress: orderData.shippingAddress || {},
      paymentMethod: orderData.paymentMethod || "",
      customerEmail: orderData.customerEmail || "",
      buyer: orderData.buyer || {},
      ...orderData,
    };

    // Agregar la nueva orden al historial
    setOrders((prevOrders) => [newOrder, ...prevOrders]);

    return newOrder;
  };

  // Función para obtener una orden por ID
  const getOrderById = (orderId) => {
    return orders.find((order) => order.id === orderId);
  };

  // Función para obtener órdenes por userId (para sincronizar con Firebase)
  const getOrdersByUserId = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  // Función para agregar órdenes desde Firebase
  const addOrdersFromFirebase = (firebaseOrders) => {
    setOrders((prevOrders) => {
      const existingIds = new Set(prevOrders.map((order) => order.firebaseId));
      const newOrders = firebaseOrders.filter(
        (order) => !existingIds.has(order.firebaseId || order.id)
      );
      return [...newOrders, ...prevOrders];
    });
  };

  let data = {
    cart,
    addToCart,
    removeById,
    resetCart,
    getTotalAmount,
    getTotalQuantity,
    // Funciones para órdenes
    orders,
    createOrder,
    getOrderById,
    getOrdersByUserId,
    addOrdersFromFirebase,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
