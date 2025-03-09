import { useEffect, useState } from "react";
import Counter from "../../common/counter/Counter";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import Button from "@mui/material/Button";
import { db } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    let productColecction = collection(db, "products");
    let refDoc = doc(productColecction, id);
    const getProduct = getDoc(refDoc);
    getProduct.then((res) => {
      setItem({ id: res.id, ...res.data() });
    });
  }, [id]);

  if (!item) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "64px",
      }}
    >
      <Card sx={{ maxWidth: 600, marginTop: "20px", padding: "20px" }}>
        {item.imageUrl && (
          <CardMedia
            sx={{ height: 300, backgroundSize: "contain" }}
            image={item.imageUrl}
            title={item.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {item.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {formatPrice(item.price)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", marginBottom: "20px" }}
          >
            {item.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "green", marginBottom: "10px" }}
          >
            Envío GRATIS
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            Garantía Oficial 12 meses
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "20px" }}>
            ¡12 cuotas sin interés!
          </Typography>
        </CardContent>
        <CardActions>
          <Counter item={item} />
        </CardActions>
      </Card>
    </div>
  );
};

export default ItemDetail;
