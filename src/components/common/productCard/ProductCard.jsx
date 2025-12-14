import "./ProductCard.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const ProductCard = ({ price, title, imageUrl, id }) => {
  return (
    <Card
      className="product-card"
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        transition: "box-shadow 0.3s, border-color 0.3s",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          borderColor: "#1976d2",
        },
      }}
    >
      <CardMedia
        className="product-card-image"
        sx={{
          height: 220,
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        image={imageUrl}
        title={title}
      />
      <CardContent
        className="product-card-content"
        sx={{ flexGrow: 1, padding: "16px" }}
      >
        <Typography
          className="product-card-title"
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
        >
          {title}
        </Typography>
        <Typography
          className="product-card-price"
          variant="h6"
          component="div"
          sx={{ color: "#1976d2", fontWeight: "bold" }}
        >
          ${formatPrice(price)}
        </Typography>
      </CardContent>
      <CardActions className="product-card-actions" sx={{ padding: "16px" }}>
        <Link
          to={`/itemDetail/${id}`}
          style={{ textDecoration: "none", width: "100%" }}
        >
          <Button
            className="product-card-button"
            variant="contained"
            size="medium"
            fullWidth
            sx={{
              backgroundColor: "#1976d2",
              "&:hover": { backgroundColor: "#1565c0" },
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
