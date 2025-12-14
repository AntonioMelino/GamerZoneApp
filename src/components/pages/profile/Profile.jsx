"use client";

import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EmailIcon from "@mui/icons-material/Email";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

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
          <h3
            style={{
              marginBottom: "var(--spacing-md)",
              color: "var(--text-primary)",
              fontSize: "1.25rem",
            }}
          >
            Estadísticas
          </h3>
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
          <h3
            style={{
              marginBottom: "var(--spacing-md)",
              color: "var(--text-primary)",
              fontSize: "1.25rem",
            }}
          >
            Acciones
          </h3>
          <div className="profile-actions">
            <button
              className="action-button action-button-primary"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartIcon />
              Ver mi carrito
            </button>
            <button className="action-button action-button-secondary">
              <EditIcon />
              Editar perfil
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
    </div>
  );
};

export default Profile;
