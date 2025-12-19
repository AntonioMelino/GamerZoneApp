"use client";

import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router";
import AuthGuard from "../../auth/authGuard/AuthGuard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HistoryIcon from "@mui/icons-material/History";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./OrdersHistory.css";

const OrdersHistory = () => {
  return (
    <AuthGuard
      redirectTo="/login"
      message="Para ver tu historial de compras necesitas iniciar sesión"
    >
      <OrdersHistoryContent />
    </AuthGuard>
  );
};

const OrdersHistoryContent = () => {
  const { orders } = useContext(CartContext);
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon style={{ color: "#22c55e" }} />;
      case "pending":
        return <LocalShippingIcon style={{ color: "#f59e0b" }} />;
      case "cancelled":
        return <CancelIcon style={{ color: "#ef4444" }} />;
      default:
        return <LocalShippingIcon />;
    }
  };

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

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "none",
              border: "none",
              color: "var(--primary-color)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "var(--spacing-md)",
              fontSize: "0.95rem",
            }}
          >
            <ArrowBackIcon />
            Volver al perfil
          </button>
          <h1 className="orders-title">Historial de Compras</h1>
        </div>

        <div className="no-orders">
          <HistoryIcon className="empty-icon" />
          <h3 style={{ marginBottom: "var(--spacing-md)" }}>
            Aún no has realizado ninguna compra
          </h3>
          <p
            style={{
              marginBottom: "var(--spacing-lg)",
              color: "var(--text-muted)",
            }}
          >
            Cuando realices tu primera compra, aparecerá aquí
          </p>
          <button
            className="action-button action-button-primary"
            style={{ width: "auto", margin: "0 auto" }}
            onClick={() => navigate("/")}
          >
            <ShoppingCartIcon />
            Comenzar a comprar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "none",
            border: "none",
            color: "var(--primary-color)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "var(--spacing-md)",
            fontSize: "0.95rem",
          }}
        >
          <ArrowBackIcon />
          Volver al perfil
        </button>
        <h1 className="orders-title">Historial de Compras</h1>
        <p style={{ color: "var(--text-muted)" }}>
          {orders.length}{" "}
          {orders.length === 1 ? "compra realizada" : "compras realizadas"}
        </p>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div>
                <div className="order-id">Orden #{order.id.slice(-8)}</div>
                <div className="order-date">
                  {new Date(order.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                {getStatusIcon(order.status)}
                <span className={`order-status ${order.status}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            <div className="order-items">
              {order.items.slice(0, 3).map((item) => (
                <div key={item.id} className="order-item">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="item-image"
                    onError={(e) => {
                      e.target.src =
                        "/placeholder.svg?height=60&width=60&text=Producto";
                    }}
                  />
                  <div className="item-info">
                    <div className="item-name">{item.title}</div>
                    <div className="item-price">
                      ${item.price.toLocaleString()} x {item.quantity}
                    </div>
                  </div>
                  <div className="item-quantity">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "var(--spacing-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  +{order.items.length - 3} producto
                  {order.items.length - 3 !== 1 ? "s" : ""} más
                </div>
              )}
            </div>

            <div className="order-footer">
              <div className="order-total">
                Total: ${order.total.toLocaleString()}
              </div>
              <div className="order-actions">
                <button
                  className="action-button action-button-secondary"
                  onClick={() => navigate(`/profile/orders/${order.id}`)}
                >
                  Ver detalle
                </button>
                {order.status === "completed" && (
                  <button
                    className="action-button action-button-primary"
                    onClick={() => window.print()}
                  >
                    Descargar factura
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersHistory;
