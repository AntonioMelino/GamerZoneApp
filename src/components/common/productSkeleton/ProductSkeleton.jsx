import { Skeleton, Stack } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton
        variant="text"
        width={210}
        sx={{ fontSize: "1rem" }}
        height={100}
      />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  );
};

export default ProductSkeleton;
