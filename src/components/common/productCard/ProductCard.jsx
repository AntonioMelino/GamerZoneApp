import "./productCard.css";
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
        width: 350,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        sx={{ height: 250, objectFit: "cover" }} // Aumenté la altura de la imagen a 250px
        image={imageUrl}
        title={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${formatPrice(price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/itemDetail/${id}`}>
          <Button size="small">Ver detalle</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

// import "./productCard.css";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router"; // Asegúrate de importar correctamente Link

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("es-AR").format(price);
// };

// const ProductCard = ({ price, title, imageUrl, id }) => {
//   return (
//     <Card
//       sx={{
//         width: 300,
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <CardMedia
//         sx={{ height: 200, objectFit: "cover" }} // Altura fija y ajuste de la imagen
//         image={imageUrl}
//         title={title}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography gutterBottom variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography gutterBottom variant="h6" component="div">
//           ${formatPrice(price)}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Link to={`/itemDetail/${id}`}>
//           <Button size="small">Ver detalle</Button>
//         </Link>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;

// import "./productCard.css";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { Link } from "react-router";

// const formatPrice = (price) => {
//   return new Intl.NumberFormat("es-AR").format(price);
// };

// const ProductCard = ({ price, title, imageUrl, id }) => {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia sx={{ height: 140 }} image={imageUrl} title={title} />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {title}
//         </Typography>
//         <Typography gutterBottom variant="h6" component="div">
//           ${formatPrice(price)}
//         </Typography>
//         {/* <Typography variant="body2" sx={{ color: "text.secondary" }}>
//           {description}
//         </Typography> */}
//       </CardContent>
//       <CardActions>
//         <Link to={`/itemDetail/${id}`}>
//           <Button size="small">Ver detalle</Button>
//         </Link>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductCard;
