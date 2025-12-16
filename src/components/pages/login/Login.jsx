"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GoogleIcon from "@mui/icons-material/Google";
import AlreadyLoggedIn from "../../auth/alreadyLoggedIn/AlreadyLoggedIn";
import "./Login.css";

const Login = () => {
  const { user } = useAuth();

  // Si el usuario ya está autenticado, mostrar componente AlreadyLoggedIn
  if (user) {
    return <AlreadyLoggedIn />;
  }

  return <LoginForm />;
};

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/profile";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!displayName.trim()) {
          setError("Por favor ingresa tu nombre");
          setLoading(false);
          return;
        }
        await signup(email, password, displayName);
      }
      navigate(from);
    } catch (err) {
      console.error("[v0] Error de autenticación:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Este email ya está registrado");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else if (err.code === "auth/invalid-email") {
        setError("Email inválido");
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Email o contraseña incorrectos");
      } else {
        setError("Ocurrió un error. Intenta nuevamente");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate(from);
    } catch (err) {
      console.error("[v0] Error de login con Google:", err);
      setError("No se pudo iniciar sesión con Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <AccountCircleIcon className="login-icon" />
          <h1 className="login-title">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </h1>
          <p className="login-subtitle">
            {isLogin
              ? "Bienvenido de vuelta a GamerZone"
              : "Únete a la comunidad gamer"}
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tu nombre"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading
              ? "Cargando..."
              : isLogin
              ? "Iniciar Sesión"
              : "Crear Cuenta"}
          </button>
        </form>

        <div className="divider">O continúa con</div>

        <button
          onClick={handleGoogleLogin}
          className="google-button"
          disabled={loading}
        >
          <GoogleIcon />
          Google
        </button>

        <div className="login-footer">
          {isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="login-link"
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
