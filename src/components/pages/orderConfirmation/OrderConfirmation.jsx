"use client";

import { useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { CartContext } from "../../../context/CartContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import "./OrderConfirmation.css";
import { formatOrderDate } from "../../../utils/dateFormatter/DateFormatter";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { getOrderById } = useContext(CartContext);
  const navigate = useNavigate();

  const order = getOrderById(orderId);

  useEffect(() => {
    if (!order && orderId) {
      // Si no encuentra la orden local, redirigir al historial
      setTimeout(() => {
        navigate("/profile/orders");
      }, 2000);
    }
  }, [order, orderId, navigate]);

  if (!order) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="confirmation-icon">
            <CheckCircleIcon />
          </div>
          <h1 className="confirmation-title">¡Compra Exitosa!</h1>
          <p className="confirmation-message">
            Redirigiendo a tu historial de compras...
          </p>
          <div className="confirmation-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/profile/orders")}
            >
              <HistoryIcon />
              Ir al historial
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          <CheckCircleIcon />
        </div>

        <h1 className="confirmation-title">¡Compra Exitosa!</h1>
        <p className="confirmation-message">
          Tu pedido ha sido confirmado y está siendo procesado.
          {order.buyer?.email && (
            <>
              <br />
              Recibirás un correo de confirmación en{" "}
              <strong>{order.buyer.email}</strong>
            </>
          )}
        </p>

        <div className="order-summary">
          <div className="summary-item">
            <span>Número de orden:</span>
            <strong>{order.firebaseId || order.id}</strong>
          </div>
          <div className="summary-item">
            <span>Fecha:</span>
            <span>{formatOrderDate(order.date)}</span>
          </div>
          <div className="summary-item">
            <span>Total:</span>
            <strong>${formatPrice(order.total)}</strong>
          </div>
          <div className="summary-item">
            <span>Estado:</span>
            <span className={`status-badge ${order.status}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          {order.buyer && (
            <>
              <div className="summary-item">
                <span>Cliente:</span>
                <span>
                  {order.buyer.nombre} {order.buyer.apellido}
                </span>
              </div>
              <div className="summary-item">
                <span>Envío a:</span>
                <span>
                  {order.buyer.direccion}, {order.buyer.ciudad}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="confirmation-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/profile/orders")}
          >
            <HistoryIcon />
            Ver mis pedidos
          </button>
          <button className="btn-secondary" onClick={() => navigate("/")}>
            <HomeIcon />
            Seguir comprando
          </button>
        </div>

        <Link to={`/profile/orders/${order.id}`} className="order-details-link">
          Ver detalles completos de la orden →
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
