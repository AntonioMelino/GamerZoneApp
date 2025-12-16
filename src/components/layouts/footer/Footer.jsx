import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo-section">
        <SportsEsportsIcon className="footer-logo-icon" />
        <h2 className="footer-logo-title">GamerZoneApp</h2>
        <p className="footer-logo-subtitle">Tu tienda gamer de confianza</p>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <h3>INFORMACIÓN ÚTIL</h3>
          <ul>
            <li>Preguntas frecuentes</li>
            <li>Formas de pago</li>
            <li>Botón de arrepentimiento</li>
            <li>Términos y condiciones</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>ACERCA DE GAMERZONEAPP</h3>
          <ul>
            <li>¿Quienes somos?</li>
            <li>Ubicación</li>
            <li>Contacto</li>
            <li>Trabajar en GamerZoneApp</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>CONTÁCTENOS</h3>
          <ul>
            <li>Quiero preguntar</li>
            <li>Quiero que me llamen</li>
            <li>0810-111-2223</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>REDES</h3>
          <p>Seguinos en nuestras redes sociales</p>
          <div className="social-icons">
            <IconButton
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2025 GamerZoneApp - Hecho por Antonio Melino</p>
      </div>
    </footer>
  );
};

export default Footer;
