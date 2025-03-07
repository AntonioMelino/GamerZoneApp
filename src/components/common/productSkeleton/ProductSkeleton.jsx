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

// import { Skeleton, Stack } from "@mui/material";

// const ProductSkeleton = () => {
//   return (
//     <Stack spacing={1}>
//       {/* For variant="text", adjust the height via font-size */}
//       <Skeleton
//         variant="text"
//         width={210}
//         sx={{ fontSize: "1rem" }}
//         height={100}
//       />
//       {/* For other variants, adjust the size with `width` and `height` */}
//       <Skeleton variant="circular" width={40} height={40} />
//       <Skeleton variant="rectangular" width={210} height={60} />
//       <Skeleton variant="rounded" width={210} height={60} />
//     </Stack>
//   );
// };

// export default ProductSkeleton;
