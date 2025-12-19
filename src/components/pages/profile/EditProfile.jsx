"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import AuthGuard from "../../auth/authGuard/AuthGuard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./EditProfile.css";

const EditProfile = () => {
  return (
    <AuthGuard
      redirectTo="/login"
      message="Para editar tu perfil necesitas iniciar sesión"
    >
      <EditProfileContent />
    </AuthGuard>
  );
};

const EditProfileContent = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    displayName: user.displayName || "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    address: "",
  });

  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await updateProfile({
        displayName: formData.displayName,
        photoURL: avatar,
      });

      setSuccess("Perfil actualizado correctamente");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("[v0] Error al actualizar perfil:", error);
      setError("Error al actualizar el perfil. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
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
        <h1 className="edit-profile-title">Editar Perfil</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Actualiza tu información personal
        </p>
      </div>

      <div className="edit-profile-card">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="avatar-upload">
            <div className="avatar-preview">
              {avatar ? (
                <img src={avatar} alt="Avatar" />
              ) : (
                <PersonIcon style={{ fontSize: "3rem", color: "white" }} />
              )}
            </div>
            <div className="avatar-upload-label">
              <label className="upload-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                />
                Cambiar foto de perfil
              </label>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginTop: "0.5rem",
                }}
              >
                Recomendado: JPG, PNG de 100x100px
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <PersonIcon fontSize="small" />
              Nombre completo
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Tu nombre"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <EmailIcon fontSize="small" />
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="tu@email.com"
              disabled
            />
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              El email no se puede modificar
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">
              <PhoneIcon fontSize="small" />
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="+54 9 11 1234-5678"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <LocationOnIcon fontSize="small" />
              Dirección
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Calle, número, ciudad, código postal"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="cancel-button"
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
