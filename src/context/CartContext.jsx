"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("[v0] Error al cargar carrito:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Cargar órdenes desde Firestore según usuario
  useEffect(() => {
    const loadUserOrders = async () => {
      if (!user) {
        setOrders([]);
        // Limpiar localStorage de órdenes antiguas globales
        localStorage.removeItem("orders");
        return;
      }

      setLoadingOrders(true);
      try {
        // 1. Cargar desde Firestore
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const firebaseOrders = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // 🔥 MODIFICACIÓN: Asegurar que la orden tenga fecha siempre
          let orderDate = data.date || data.createdAt;

          // Convertir a string ISO si es Timestamp de Firebase
          if (orderDate && orderDate.toDate) {
            orderDate = orderDate.toDate().toISOString();
          } else if (
            orderDate &&
            typeof orderDate === "object" &&
            orderDate._seconds
          ) {
            // Si es Timestamp serializado ({_seconds, _nanoseconds})
            orderDate = new Date(orderDate._seconds * 1000).toISOString();
          } else if (!orderDate) {
            // Si no hay fecha, usar fecha actual
            orderDate = new Date().toISOString();
          }

          firebaseOrders.push({
            id: doc.id, // Usar ID de Firebase como ID local
            firebaseId: doc.id,
            ...data,
            date: orderDate, // 🔥 Siempre guardar como string ISO
          });
        });

        // 2. Cargar órdenes locales antiguas (para migración)
        const savedOrders = localStorage.getItem(`orders_${user.uid}`);
        let localOrders = [];

        if (savedOrders) {
          try {
            localOrders = JSON.parse(savedOrders);
            // 🔥 MODIFICACIÓN: Asegurar que las órdenes locales también tengan fecha
            localOrders = localOrders.map((order) => ({
              ...order,
              date: order.date || new Date().toISOString(),
            }));
          } catch (error) {
            console.error("[v0] Error al cargar órdenes locales:", error);
          }
        }

        // 3. Combinar, eliminando duplicados
        const allOrders = [...firebaseOrders];

        // Añadir órdenes locales que no estén en Firestore
        localOrders.forEach((localOrder) => {
          const exists = allOrders.some(
            (fbOrder) =>
              fbOrder.firebaseId === localOrder.firebaseId ||
              fbOrder.id === localOrder.id
          );

          if (!exists) {
            allOrders.push(localOrder);
          }
        });

        // 4. Eliminar duplicados adicionales
        const uniqueOrders = [];
        const seenIds = new Set();

        allOrders.forEach((order) => {
          const id = order.firebaseId || order.id;
          if (!seenIds.has(id)) {
            seenIds.add(id);
            uniqueOrders.push(order);
          }
        });

        // 5. Ordenar por fecha más reciente
        uniqueOrders.sort(
          (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
        );

        setOrders(uniqueOrders);

        // 6. Guardar cache local (solo órdenes únicas)
        localStorage.setItem(
          `orders_${user.uid}`,
          JSON.stringify(uniqueOrders)
        );
      } catch (error) {
        console.error("[v0] Error al cargar órdenes:", error);
        // Fallback a localStorage
        const savedOrders = localStorage.getItem(`orders_${user.uid}`);
        if (savedOrders) {
          try {
            const parsedOrders = JSON.parse(savedOrders);
            // Eliminar duplicados incluso en fallback
            const seenIds = new Set();
            const uniqueOrders = parsedOrders
              .filter((order) => {
                const id = order.firebaseId || order.id;
                if (!seenIds.has(id)) {
                  seenIds.add(id);
                  return true;
                }
                return false;
              })
              .map((order) => ({
                ...order,
                date: order.date || new Date().toISOString(), // 🔥 Asegurar fecha
              }));
            setOrders(uniqueOrders);
          } catch (error) {
            console.error("[v0] Error en fallback:", error);
            setOrders([]);
          }
        } else {
          setOrders([]);
        }
      } finally {
        setLoadingOrders(false);
      }
    };

    loadUserOrders();
  }, [user]);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  // Guardar órdenes en localStorage cuando cambian (POR USUARIO)
  useEffect(() => {
    if (user && orders.length > 0) {
      // Eliminar duplicados antes de guardar
      const seenIds = new Set();
      const uniqueOrders = orders.filter((order) => {
        const id = order.firebaseId || order.id;
        if (!seenIds.has(id)) {
          seenIds.add(id);
          return true;
        }
        return false;
      });
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(uniqueOrders));
    } else if (user && orders.length === 0) {
      localStorage.removeItem(`orders_${user.uid}`);
    }
  }, [orders, user]);

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
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    // Usar firebaseId como ID principal si existe
    const orderId =
      orderData.firebaseId ||
      `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // 🔥 MODIFICACIÓN: Asegurar que la fecha sea string ISO
    let orderDate;
    if (orderData.date) {
      if (orderData.date.toDate) {
        orderDate = orderData.date.toDate().toISOString();
      } else if (typeof orderData.date === "string") {
        orderDate = orderData.date;
      } else if (orderData.date instanceof Date) {
        orderDate = orderData.date.toISOString();
      } else {
        orderDate = new Date(orderData.date).toISOString();
      }
    } else {
      orderDate = new Date().toISOString();
    }

    const newOrder = {
      id: orderId,
      firebaseId: orderData.firebaseId || null,
      date: orderDate, // 🔥 Siempre string ISO
      items: [...cart],
      total: getTotalAmount(),
      status: orderData.status || "completed",
      userId: user.uid,
      shippingAddress: orderData.shippingAddress || {},
      paymentMethod: orderData.paymentMethod || "",
      customerEmail: orderData.customerEmail || "",
      buyer: orderData.buyer || {},
      ...orderData,
    };

    // Verificar si ya existe una orden con este ID
    const orderExists = orders.some(
      (order) =>
        (order.firebaseId && order.firebaseId === newOrder.firebaseId) ||
        order.id === newOrder.id
    );

    if (!orderExists) {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    } else {
      console.log("[v0] Orden ya existe, evitando duplicado:", newOrder.id);
    }

    return newOrder;
  };

  // Función para obtener una orden por ID
  const getOrderById = (orderId) => {
    const order = orders.find(
      (order) => order.id === orderId || order.firebaseId === orderId
    );

    // 🔥 MODIFICACIÓN: Debug si no encuentra la orden
    if (!order) {
      console.warn("No se encontró orden con ID:", orderId);
      console.log(
        "Órdenes disponibles:",
        orders.map((o) => ({ id: o.id, firebaseId: o.firebaseId }))
      );
    }

    return order;
  };

  // Función para obtener órdenes por userId
  const getOrdersByUserId = (userId) => {
    return orders.filter((order) => order.userId === userId);
  };

  // Función para cargar órdenes desde Firestore (sincronización manual)
  const loadOrdersFromFirebase = async () => {
    if (!user) return [];

    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const firebaseOrders = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // 🔥 MODIFICACIÓN: Asegurar fecha
        let orderDate = data.date || data.createdAt;
        if (orderDate && orderDate.toDate) {
          orderDate = orderDate.toDate().toISOString();
        } else if (!orderDate) {
          orderDate = new Date().toISOString();
        }

        firebaseOrders.push({
          id: doc.id,
          firebaseId: doc.id,
          ...data,
          date: orderDate,
        });
      });

      // Actualizar estado local
      setOrders(firebaseOrders);

      // Guardar en localStorage
      localStorage.setItem(
        `orders_${user.uid}`,
        JSON.stringify(firebaseOrders)
      );

      return firebaseOrders;
    } catch (error) {
      console.error("[v0] Error al cargar órdenes de Firebase:", error);
      throw error;
    }
  };

  // Función para agregar órdenes desde Firebase (mantener compatibilidad)
  const addOrdersFromFirebase = (firebaseOrders) => {
    setOrders((prevOrders) => {
      const existingIds = new Set(
        prevOrders.map((order) => order.firebaseId || order.id)
      );
      const newOrders = firebaseOrders.filter(
        (order) => !existingIds.has(order.firebaseId || order.id)
      );
      return [...newOrders, ...prevOrders];
    });
  };

  const data = {
    cart,
    orders,
    loadingOrders,
    addToCart,
    removeById,
    resetCart,
    getTotalAmount,
    getTotalQuantity,
    createOrder,
    getOrderById,
    getOrdersByUserId,
    addOrdersFromFirebase,
    loadOrdersFromFirebase,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
