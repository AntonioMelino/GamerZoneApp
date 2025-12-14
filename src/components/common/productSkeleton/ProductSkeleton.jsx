import { Skeleton, Stack } from "@mui/material";
import "./ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <Stack
      spacing={1}
      className="product-skeleton"
      sx={{ width: "100%", maxWidth: "300px" }}
    >
      {/* Imagen del producto */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={220}
        sx={{ borderRadius: "8px" }}
      />

      {/* Título del producto */}
      <Skeleton
        variant="text"
        width="80%"
        height={30}
        sx={{ fontSize: "1.5rem" }}
      />

      {/* Precio del producto */}
      <Skeleton
        variant="text"
        width="60%"
        height={35}
        sx={{ fontSize: "1.2rem" }}
      />

      {/* Botón de acción */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ borderRadius: "8px", marginTop: "0.5rem" }}
      />
    </Stack>
  );
};

export default ProductSkeleton;
