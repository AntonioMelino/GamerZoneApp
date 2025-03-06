import { Box, Container, Grid, Link, Typography } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1976d2", // Mismo color que el NavBar
        color: "#fff",
        padding: "40px 0",
        marginTop: "auto",
        fontFamily: "monospace", // Misma tipografía que el NavBar
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sección "Sobre Nosotros" */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Sobre Nosotros
            </Typography>
            <Typography variant="body2">
              En GamerZoneApp nos especializamos en hardware y accesorios
              gaming. Ofrecemos PCs, notebooks, consolas como la Play 5, sillas
              gamer y más. ¡Lleva tu experiencia al máximo nivel con nosotros!
            </Typography>
          </Grid>

          {/* Sección "Enlaces Rápidos" */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Enlaces Rápidos
            </Typography>
            <Link href="#" color="inherit" display="block">
              Inicio
            </Link>
            <Link href="#" color="inherit" display="block">
              Servicios
            </Link>
            <Link href="#" color="inherit" display="block">
              Contacto
            </Link>
          </Grid>

          {/* Sección "Síguenos" */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Síguenos
            </Typography>
            <Box>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit" sx={{ ml: 2 }}>
                <Twitter />
              </Link>
              <Link href="#" color="inherit" sx={{ ml: 2 }}>
                <Instagram />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Derechos de autor */}
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} GamerZoneApp. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
