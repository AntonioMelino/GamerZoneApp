"use client";

import CartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import "./CartWidget.css";

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);
  const total = getTotalQuantity();

  return (
    <div className="cart-widget-container">
      <Badge
        badgeContent={total}
        color="secondary"
        showZero={true}
        className="cart-widget-badge"
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "var(--secondary-color)",
            color: "white",
            fontWeight: 700,
          },
        }}
      >
        <CartIcon className="cart-widget-icon" />
      </Badge>
    </div>
  );
};

export default CartWidget;
