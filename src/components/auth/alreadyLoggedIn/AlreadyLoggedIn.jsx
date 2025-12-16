"use client";

import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import "./AlreadyLoggedIn.css";

const AlreadyLoggedIn = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // Recargar la página para mostrar el formulario de login
      window.location.reload();
    } catch (error) {
      console.error("[v0] Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="already-logged-container">
      <div className="already-logged-card">
        <div className="success-icon-wrapper">
          <CheckCircleIcon className="success-icon" />
        </div>

        <h1 className="already-logged-title">
          ¡Hola, {user?.displayName || "Gamer"}!
        </h1>

        <p className="already-logged-subtitle">
          Ya tienes una sesión iniciada en GamerZoneApp
        </p>

        <div className="user-info-box">
          <AccountCircleIcon className="user-info-icon" />
          <div className="user-info-text">
            <div className="user-info-name">
              {user?.displayName || "Usuario Gamer"}
            </div>
            <div className="user-info-email">{user?.email}</div>
          </div>
        </div>

        <div className="already-logged-actions">
          <button
            className="action-btn action-btn-primary"
            onClick={() => navigate("/profile")}
          >
            <AccountCircleIcon />
            Ir a mi perfil
          </button>

          <button
            className="action-btn action-btn-secondary"
            onClick={() => navigate("/")}
          >
            <ShoppingBagIcon />
            Continuar comprando
          </button>

          <button
            className="action-btn action-btn-outline"
            onClick={handleLogout}
          >
            <LogoutIcon />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlreadyLoggedIn;
