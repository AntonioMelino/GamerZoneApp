import { useEffect, useState } from "react";
import Counter from "../../common/counter/Counter";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { db } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR").format(price);
};

const ItemDetail = () => {
  const { id } = useParams();

  // Inicializa `item` como `null` o un objeto vacío
  const [item, setItem] = useState(null);

  useEffect(() => {
    let productColecction = collection(db, "products");
    let refDoc = doc(productColecction, id);
    const getProduct = getDoc(refDoc);
    getProduct.then((res) => {
      setItem({ id: res.id, ...res.data() });
    });
  }, [id]);

  // Si `item` es `null`, muestra un mensaje de carga o un spinner
  if (!item) {
    return <div>Cargando...</div>;
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: "20px" }}>
      {/* Verifica que `item.imageUrl` tenga un valor antes de renderizar `CardMedia` */}
      {item.imageUrl && (
        <CardMedia
          sx={{ height: 140 }}
          image={item.imageUrl}
          title={item.title} // Usa el título del producto como título de la imagen
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${formatPrice(item.price)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Counter item={item} />
      </CardActions>
    </Card>
  );
};

export default ItemDetail;

// import { useEffect, useState } from "react";
// import Counter from "../../common/counter/Counter";
// import { useParams } from "react-router";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { db } from "../../../firebaseConfig";
// import { collection, doc, getDoc } from "firebase/firestore";

// const ItemDetail = () => {
//   const { id } = useParams();

//   const [item, setItem] = useState([]);

//   useEffect(() => {
//     let productColecction = collection(db, "products");
//     let refDoc = doc(productColecction, id);
//     const getProduct = getDoc(refDoc);
//     getProduct.then((res) => {
//       setItem({ id: res.id, ...res.data() });
//     });
//   }, [id]);

//   return (
//     <Card sx={{ maxWidth: 345, marginTop: "20px" }}>
//       <CardMedia
//         sx={{ height: 140 }}
//         image={item.imageUrl}
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {item.title}
//         </Typography>
//         <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {item.description}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Counter item={item} />
//       </CardActions>
//     </Card>
//   );
// };

// export default ItemDetail;

//DENTRO DE USE EFFECT
// let producto = products.find((product) => product.id === id);
// setItem(producto);
