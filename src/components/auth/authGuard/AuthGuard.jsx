"use client";

import { useAuth } from "../../../context/AuthContext";
import { useLocation } from "react-router";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router";
import "./AuthGuard.css";

const AuthGuard = ({ children, redirectTo = "/login", message }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mostrar loader mientras verifica autenticación
  if (loading) {
    return (
      <div className="auth-guard-loading">
        <div className="loading-spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  // Si no está autenticado, mostrar página de bloqueo en lugar de redirigir directamente
  if (!user) {
    return (
      <AuthRequired
        redirectTo={redirectTo}
        message={message}
        from={location.pathname}
      />
    );
  }

  // Usuario autenticado, renderizar el contenido protegido
  return children;
};

const AuthRequired = ({ redirectTo, message, from }) => {
  const navigate = useNavigate();

  return (
    <div className="auth-required-container">
      <div className="auth-required-card">
        <div className="auth-required-icon-wrapper">
          <LockIcon className="auth-required-icon" />
        </div>

        <h1 className="auth-required-title">Autenticación requerida</h1>

        <p className="auth-required-message">
          {message ||
            "Para acceder a esta página necesitas iniciar sesión con tu cuenta."}
        </p>

        <div className="auth-required-actions">
          <button
            className="auth-button auth-button-primary"
            onClick={() => navigate(redirectTo, { state: { from } })}
          >
            <LoginIcon />
            Iniciar Sesión
          </button>

          <button
            className="auth-button auth-button-secondary"
            onClick={() =>
              navigate(redirectTo, { state: { from, isRegister: true } })
            }
          >
            <PersonAddIcon />
            Crear Cuenta
          </button>
        </div>

        <button className="auth-required-back" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default AuthGuard;
