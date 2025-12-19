"use client";

import { useEffect, useState } from "react";
import Counter from "../../common/counter/Counter";
import { useParams } from "react-router";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { db } from "../../../firebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import "./ItemDetail.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price);
};

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const productColecction = collection(db, "products");
    const refDoc = doc(productColecction, id);
    const getProduct = getDoc(refDoc);
    getProduct.then((res) => {
      setItem({ id: res.id, ...res.data() });
    });
  }, [id]);

  const handleImageError = () => {
    console.log("[v0] Error cargando imagen en ItemDetail, usando placeholder");
    setImageError(true);
  };

  if (!item) {
    return <div className="loading-state">Cargando producto...</div>;
  }

  return (
    <div className="item-detail-container">
      <Card className="item-detail-card">
        <div className="item-detail-main-content">
          {" "}
          {/* NUEVO contenedor */}
          <div className="item-detail-image-container">
            <img
              className="item-detail-image"
              src={
                imageError
                  ? "/placeholder.svg?height=400&width=400&query=producto"
                  : item.imageUrl
              }
              alt={item.title}
              onError={handleImageError}
            />
          </div>
          <CardContent className="item-detail-content">
            <Typography
              className="item-detail-title"
              gutterBottom
              variant="h4"
              component="div"
            >
              {item.title}
            </Typography>
            <Typography
              className="item-detail-price"
              gutterBottom
              variant="h5"
              component="div"
            >
              {formatPrice(item.price)}
            </Typography>
            <Typography className="item-detail-description" variant="body1">
              {item.description}
            </Typography>

            <div className="item-detail-features">
              <div className="item-detail-feature">
                <LocalShippingIcon className="item-detail-feature-icon" />
                <Typography
                  className="item-detail-feature-text"
                  variant="body2"
                >
                  Envío GRATIS
                </Typography>
              </div>
              <div className="item-detail-feature">
                <VerifiedIcon className="item-detail-feature-icon" />
                <Typography
                  className="item-detail-feature-text"
                  variant="body2"
                >
                  Garantía Oficial 12 meses
                </Typography>
              </div>
              <div className="item-detail-feature">
                <CreditCardIcon className="item-detail-feature-icon" />
                <Typography
                  className="item-detail-feature-text"
                  variant="body2"
                >
                  ¡12 cuotas sin interés!
                </Typography>
              </div>
            </div>
          </CardContent>
        </div>
        <CardActions className="item-detail-actions">
          <Counter item={item} />
        </CardActions>
      </Card>
    </div>
  );
};

export default ItemDetail;
