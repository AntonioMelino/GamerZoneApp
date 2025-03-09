import "./Footer.css"; // Archivo de estilos para el footer
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton } from "@mui/material";

const Footer = () => {
  return (
    <footer className="footer">
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
            href="https://facebook.com" // Enlace a Facebook
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon style={{ color: "white" }} />{" "}
            {/* Color de Facebook */}
          </IconButton>
          <IconButton
            aria-label="Twitter"
            href="https://twitter.com" // Enlace a Twitter
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon style={{ color: "white" }} /> {/* Color de Twitter */}
          </IconButton>
          <IconButton
            aria-label="Instagram"
            href="https://instagram.com" // Enlace a Instagram
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon style={{ color: "white" }} />{" "}
            {/* Color de Instagram */}
          </IconButton>
        </div>
      </div>
      <div className="footer-copyright">
        <p>Copyright © 2025 - 2025 GamerZoneApp - Hecho por Antonio Melino</p>
      </div>
    </footer>
  );
};

export default Footer;
