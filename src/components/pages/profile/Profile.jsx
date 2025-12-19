"use client";

import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import AuthGuard from "../../auth/authGuard/AuthGuard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";

const Profile = () => {
  return (
    <AuthGuard
      redirectTo="/login"
      message="Para ver tu perfil necesitas iniciar sesión con tu cuenta de GamerZoneApp"
    >
      <ProfileContent />
    </AuthGuard>
  );
};

const ProfileContent = () => {
  const { user, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("[v0] Error al cerrar sesión:", error);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-title">Mi Perfil</h1>
      </div>

      <div className="profile-grid">
        {/* Información del usuario */}
        <div className="profile-card">
          <div className="profile-avatar">
            <AccountCircleIcon className="profile-avatar-icon" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">
              {user.displayName || "Usuario Gamer"}
            </h2>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="profile-card">
          <h3 className="profile-card-title">Estadísticas</h3>
          <div className="profile-stats">
            <div className="stat-item">
              <ShoppingCartIcon className="stat-icon" />
              <div className="stat-content">
                <div className="stat-label">Productos en carrito</div>
                <div className="stat-value">{totalItems}</div>
              </div>
            </div>
            <div className="stat-item">
              <EmailIcon className="stat-icon" />
              <div className="stat-content">
                <div className="stat-label">Email verificado</div>
                <div className="stat-value">
                  {user.emailVerified ? "Sí" : "No"}
                </div>
              </div>
            </div>
            <div className="stat-item">
              <CalendarTodayIcon className="stat-icon" />
              <div className="stat-content">
                <div className="stat-label">Miembro desde</div>
                <div className="stat-value">
                  {new Date(user.metadata.creationTime).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="profile-card">
          <h3 className="profile-card-title">Acciones</h3>
          <div className="profile-actions">
            <button
              className="action-button action-button-primary"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon />
              Ver mi carrito
            </button>
            <button
              className="action-button action-button-secondary"
              onClick={() => navigate("/profile/edit")}
            >
              <EditIcon />
              Editar perfil
            </button>
            <button
              className="action-button action-button-primary"
              onClick={() => navigate("/profile/orders")}
            >
              <HistoryIcon />
              Historial de compras
            </button>
            <button
              className="action-button action-button-danger"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Sección de historial de compras */}
      <div className="profile-card" style={{ marginTop: "var(--spacing-xl)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "var(--spacing-md)",
          }}
        >
          <HistoryIcon style={{ color: "var(--primary-color)" }} />
          <h3 className="profile-card-title">Historial de compras recientes</h3>
        </div>
        <OrderHistory />
      </div>
    </div>
  );
};

// Componente para historial de compras
const OrderHistory = () => {
  const { orders } = useContext(CartContext); // Asumiré que agregaremos orders al CartContext

  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "var(--spacing-xl)" }}>
        <HistoryIcon
          style={{
            fontSize: "4rem",
            color: "var(--text-muted)",
            marginBottom: "var(--spacing-md)",
          }}
        />
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "var(--spacing-md)",
          }}
        >
          Aún no has realizado ninguna compra
        </p>
        <button
          className="action-button action-button-primary"
          style={{ width: "auto", margin: "0 auto" }}
          onClick={() => (window.location.href = "/")}
        >
          <ShoppingCartIcon />
          Comenzar a comprar
        </button>
      </div>
    );
  }

  return (
    <div className="order-history">
      {orders.slice(0, 3).map((order) => (
        <div key={order.id} className="order-item">
          <div className="order-info">
            <div className="order-id">Orden #{order.id.slice(-8)}</div>
            <div className="order-date">
              {new Date(order.date).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div className="order-total">${order.total.toLocaleString()}</div>
          <div className={`order-status ${order.status}`}>{order.status}</div>
          <button
            className="action-button action-button-secondary"
            style={{ padding: "6px 12px", fontSize: "0.85rem" }}
            onClick={() =>
              (window.location.href = `/profile/orders/${order.id}`)
            }
          >
            Ver detalle
          </button>
        </div>
      ))}
      {orders.length > 3 && (
        <div style={{ textAlign: "center", marginTop: "var(--spacing-md)" }}>
          <button
            className="action-button action-button-secondary"
            onClick={() => (window.location.href = "/profile/orders")}
          >
            Ver todas las compras ({orders.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
