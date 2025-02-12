import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router";

const PageNotFound = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 10,
      }}
    >
      <Box>
        <Typography variant="h1" color="primary" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          ¡Oops! Página no encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          La página que buscas no existe o ha sido movida.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;


