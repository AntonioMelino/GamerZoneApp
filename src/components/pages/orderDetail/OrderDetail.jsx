"use client";

import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { CartContext } from "../../../context/CartContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";
import PrintIcon from "@mui/icons-material/Print";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { formatOrderDate } from "../../../utils/dateFormatter/DateFormatter";
import "./OrderDetail.css";

const formatPrice = (price) => {
  if (!price) return "0";
  return new Intl.NumberFormat("es-AR").format(price);
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const { getOrderById, orders, loadingOrders } = useContext(CartContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId && orders.length > 0) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
      setLoading(false);
    } else if (orders.length === 0 && !loadingOrders) {
      // Si no hay órdenes y ya terminó de cargar
      setLoading(false);
    }
  }, [orderId, orders, loadingOrders, getOrderById]);

  if (loading) {
    return (
      <div className="order-detail-container">
        <div className="order-detail-card loading">
          <div className="loading-spinner"></div>
          <p>Cargando detalles de la orden...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-detail-container">
        <div className="order-detail-card">
          <h2>Orden no encontrada</h2>
          <p>La orden que buscas no existe o ha sido eliminada.</p>
          <div className="order-detail-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("/profile/orders")}
            >
              <HistoryIcon />
              Volver al historial
            </button>
            <button className="btn-secondary" onClick={() => navigate("/")}>
              <HomeIcon />
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon className="status-icon completed" />;
      case "pending":
        return <LocalShippingIcon className="status-icon pending" />;
      case "cancelled":
        return <CancelIcon className="status-icon cancelled" />;
      default:
        return <LocalShippingIcon className="status-icon" />;
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-detail-container">
      <div className="order-detail-header">
        <button
          onClick={() => navigate("/profile/orders")}
          className="back-button"
        >
          <ArrowBackIcon />
          Volver al historial
        </button>
        <h1 className="order-detail-title">Detalles de la Orden</h1>
      </div>

      <div className="order-detail-card">
        {/* Encabezado de la orden */}
        <div className="order-header-section">
          <div className="order-id-display">
            <h2>
              Orden #
              {order.id?.slice(-8) || order.firebaseId?.slice(-8) || orderId}
            </h2>
            <div className="order-status-display">
              {getStatusIcon(order.status)}
              <span className={`status-badge ${order.status}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>

          <div className="order-date-display">
            <span className="date-label">Fecha de compra:</span>
            <span className="date-value">{formatOrderDate(order.date)}</span>
          </div>
        </div>

        {/* Información del comprador */}
        {order.buyer && (
          <div className="buyer-info-section">
            <h3>
              <PersonIcon />
              Información del Comprador
            </h3>
            <div className="buyer-info-grid">
              <div className="info-item">
                <span className="info-label">Nombre completo:</span>
                <span className="info-value">
                  {order.buyer.nombre} {order.buyer.apellido}
                </span>
              </div>
              {order.buyer.email && (
                <div className="info-item">
                  <span className="info-label">
                    <EmailIcon />
                    Email:
                  </span>
                  <span className="info-value">{order.buyer.email}</span>
                </div>
              )}
              {order.buyer.telefono && (
                <div className="info-item">
                  <span className="info-label">
                    <PhoneIcon />
                    Teléfono:
                  </span>
                  <span className="info-value">{order.buyer.telefono}</span>
                </div>
              )}
              {order.buyer.direccion && (
                <div className="info-item">
                  <span className="info-label">
                    <LocationOnIcon />
                    Dirección de envío:
                  </span>
                  <span className="info-value">
                    {order.buyer.direccion}, {order.buyer.ciudad}
                    {order.buyer.codigoPostal &&
                      `, CP: ${order.buyer.codigoPostal}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Productos */}
        <div className="products-section">
          <h3>Productos ({order.items?.length || 0})</h3>
          <div className="products-list">
            {order.items?.map((item, index) => (
              <div key={`${item.id}-${index}`} className="product-item">
                <div className="product-image-container">
                  <img
                    src={item.imageUrl || "/placeholder-product.jpg"}
                    alt={item.title}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = "/placeholder-product.jpg";
                    }}
                  />
                </div>
                <div className="product-info">
                  <h4 className="product-title">{item.title}</h4>
                  {item.description && (
                    <p className="product-description">{item.description}</p>
                  )}
                  <div className="product-details">
                    <div className="detail-row">
                      <span>Precio unitario:</span>
                      <span>${formatPrice(item.price)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Cantidad:</span>
                      <span>{item.quantity}</span>
                    </div>
                    <div className="detail-row subtotal">
                      <span>Subtotal:</span>
                      <span>${formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de pago */}
        <div className="payment-summary-section">
          <h3>Resumen de Pago</h3>
          <div className="summary-grid">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${formatPrice(order.subtotal || order.total)}</span>
            </div>
            {order.shippingCost > 0 && (
              <div className="summary-row">
                <span>Costo de envío:</span>
                <span>${formatPrice(order.shippingCost)}</span>
              </div>
            )}
            {order.tax > 0 && (
              <div className="summary-row">
                <span>Impuestos:</span>
                <span>${formatPrice(order.tax)}</span>
              </div>
            )}
            {order.discount > 0 && (
              <div className="summary-row discount">
                <span>Descuento:</span>
                <span>-${formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>Total:</span>
              <span>${formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        {(order.paymentMethod || order.shippingMethod) && (
          <div className="additional-info-section">
            <h3>Información Adicional</h3>
            <div className="additional-info-grid">
              {order.paymentMethod && (
                <div className="info-item">
                  <span className="info-label">Método de pago:</span>
                  <span className="info-value">{order.paymentMethod}</span>
                </div>
              )}
              {order.shippingMethod && (
                <div className="info-item">
                  <span className="info-label">Método de envío:</span>
                  <span className="info-value">{order.shippingMethod}</span>
                </div>
              )}
              {order.trackingNumber && (
                <div className="info-item">
                  <span className="info-label">Número de seguimiento:</span>
                  <span className="info-value tracking">
                    {order.trackingNumber}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="order-detail-actions">
          <button
            className="btn-secondary"
            onClick={() => navigate("/profile/orders")}
          >
            <HistoryIcon />
            Volver al historial
          </button>
          <button className="btn-secondary" onClick={() => navigate("/")}>
            <HomeIcon />
            Seguir comprando
          </button>
          {order.status === "completed" && (
            <button className="btn-primary" onClick={handlePrint}>
              <PrintIcon />
              Imprimir factura
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
