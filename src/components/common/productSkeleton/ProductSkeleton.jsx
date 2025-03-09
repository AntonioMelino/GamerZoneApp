import { Skeleton, Stack } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Stack spacing={1} sx={{ width: "100%", maxWidth: "300px" }}>
      {/* Imagen del producto */}
      <Skeleton variant="rectangular" width="100%" height={200} />

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
        height={25}
        sx={{ fontSize: "1.2rem" }}
      />

      {/* Botón de acción */}
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Stack>
  );
};

export default ProductSkeleton;
