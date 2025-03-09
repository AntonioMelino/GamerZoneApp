import "./productCard.css"; // Importa el archivo CSS
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router"; // Asegúrate de importar correctamente Link

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const ProductCard = ({ price, title, imageUrl, id }) => {
  return (
    <Card
      sx={{
        width: 300, // Ancho fijo para la card
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0", // Borde sutil
        borderRadius: "8px", // Bordes redondeados
        transition: "box-shadow 0.3s, border-color 0.3s", // Transición suave
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Sombra al hacer hover
          borderColor: "#1976d2", // Cambia el color del borde al hacer hover
        },
      }}
    >
      <CardMedia
        sx={{
          height: 200, // Altura fija para la imagen
          objectFit: "cover", // Ajusta la imagen al contenedor
          borderTopLeftRadius: "8px", // Bordes redondeados en la parte superior
          borderTopRightRadius: "8px",
        }}
        image={imageUrl}
        title={title}
      />
      <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          ${formatPrice(price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ padding: "16px" }}>
        <Link to={`/itemDetail/${id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0", // Cambia el color del botón al hacer hover
              },
            }}
          >
            Ver detalle
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
