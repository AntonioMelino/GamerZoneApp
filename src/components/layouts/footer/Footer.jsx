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

// import { Box, Container, Grid, Link, Typography } from "@mui/material";
// import { Facebook, Twitter, Instagram } from "@mui/icons-material";

// const Footer = () => {
//   return (
//     <Box
//       sx={{
//         backgroundColor: "#1976d2", // Mismo color que el NavBar
//         color: "#fff",
//         padding: "40px 0",
//         marginTop: "auto",
//         fontFamily: "monospace", // Misma tipografía que el NavBar
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Sección "Sobre Nosotros" */}
//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
//               Sobre Nosotros
//             </Typography>
//             <Typography variant="body2">
//               En GamerZoneApp nos especializamos en hardware y accesorios
//               gaming. Ofrecemos PCs, notebooks, consolas como la Play 5, sillas
//               gamer y más. ¡Lleva tu experiencia al máximo nivel con nosotros!
//             </Typography>
//           </Grid>

//           {/* Sección "Enlaces Rápidos" */}
//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
//               Enlaces Rápidos
//             </Typography>
//             <Link href="#" color="inherit" display="block">
//               Inicio
//             </Link>
//             <Link href="#" color="inherit" display="block">
//               Servicios
//             </Link>
//             <Link href="#" color="inherit" display="block">
//               Contacto
//             </Link>
//           </Grid>

//           {/* Sección "Síguenos" */}
//           <Grid item xs={12} sm={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
//               Síguenos
//             </Typography>
//             <Box>
//               <Link href="#" color="inherit">
//                 <Facebook />
//               </Link>
//               <Link href="#" color="inherit" sx={{ ml: 2 }}>
//                 <Twitter />
//               </Link>
//               <Link href="#" color="inherit" sx={{ ml: 2 }}>
//                 <Instagram />
//               </Link>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Derechos de autor */}
//         <Box mt={5}>
//           <Typography variant="body2" align="center">
//             © {new Date().getFullYear()} GamerZoneApp. Todos los derechos
//             reservados.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;
