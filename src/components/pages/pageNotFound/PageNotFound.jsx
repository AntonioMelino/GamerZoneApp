import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <Container maxWidth="sm" className="page-not-found-container">
      <Box className="page-not-found-content">
        <Typography
          className="page-not-found-number"
          variant="h1"
          color="primary"
          fontWeight="bold"
        >
          404
        </Typography>
        <Typography className="page-not-found-title" variant="h5" gutterBottom>
          ¡Oops! Página no encontrada
        </Typography>
        <Typography
          className="page-not-found-description"
          variant="body1"
          paragraph
        >
          La página que buscas no existe o ha sido movida. No te preocupes,
          puedes volver al inicio y seguir explorando nuestros productos.
        </Typography>
        <Button
          className="page-not-found-button"
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
