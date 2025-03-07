import { useState, useEffect } from "react";
import ProductCard from "../../common/productCard/ProductCard";
import { useParams } from "react-router";
import { Grid } from "@mui/material"; // Importamos Grid de MUI
import ProductSkeleton from "../../common/productSkeleton/ProductSkeleton";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ImageCarousel from "../../common/imageCarousel/ImageCarousel";

const images = [
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310377/165_ln6rel.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310459/197_fizpur.png",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310494/201_wzkwcf.png",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310516/200_jkadux.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310540/175_b2dyu9.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310569/190_hhaa5p.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310588/168_f3dbnv.jpg",
  "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310874/19-02-2025-11-02-24-Web_Banner_5000G_01_jxgahp.jpg",
];

const ItemListContainer = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    const coleccionDeProductos = collection(db, "products");
    let consulta = coleccionDeProductos;

    // Solo aplica el filtro si `name` tiene un valor
    if (name && name !== "Todos") {
      const coleccionFiltrada = query(
        coleccionDeProductos,
        where("category", "==", name)
      );
      consulta = coleccionFiltrada;
    }

    const getProducts = getDocs(consulta);

    getProducts
      .then((res) => {
        let newArray = res.docs.map((elemento) => {
          return { id: elemento.id, ...elemento.data() };
        });
        setItems(newArray);
      })
      .finally(() => {
        setLoading(false); // Finaliza la carga
      });
  }, [name]);

  return (
    <div style={{ marginTop: "64px" }}>
      {/* Carrusel de imágenes: Solo se muestra si no hay categoría seleccionada */}
      {!name && <ImageCarousel images={images} />}

      {/* Lista de productos */}
      {loading ? (
        <Grid
          container
          spacing={3} // Espacio entre los productos
          sx={{
            padding: "20px",
            maxWidth: "1200px", // Ancho máximo del contenedor
            margin: "0 auto", // Centra el contenedor
          }}
        >
          {[...Array(3)].map((_, index) => (
            <Grid
              item
              key={index}
              xs={12} // 1 columna en móvil
              sm={6} // 2 columnas en tablet
              md={4} // 3 columnas en desktop
            >
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={3} // Espacio entre los productos
          sx={{
            padding: "20px",
            maxWidth: "1200px", // Ancho máximo del contenedor
            margin: "0 auto", // Centra el contenedor
          }}
        >
          {items.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12} // 1 columna en móvil
              sm={6} // 2 columnas en tablet
              md={4} // 3 columnas en desktop
            >
              <ProductCard {...item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ItemListContainer;

//ANTERIOR
// import { useState, useEffect } from "react";
// import ProductCard from "../../common/productCard/ProductCard";
// import { useParams } from "react-router";
// import { Box, Grid } from "@mui/material"; // Importamos Grid de MUI
// import ProductSkeleton from "../../common/productSkeleton/ProductSkeleton";
// import { db } from "../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import ImageCarousel from "../../common/imageCarousel/ImageCarousel";

// const images = [
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310377/165_ln6rel.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310459/197_fizpur.png",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310494/201_wzkwcf.png",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310516/200_jkadux.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310540/175_b2dyu9.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310569/190_hhaa5p.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310588/168_f3dbnv.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310874/19-02-2025-11-02-24-Web_Banner_5000G_01_jxgahp.jpg",
// ];

// const ItemListContainer = () => {
//   const { name } = useParams();
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const coleccionDeProductos = collection(db, "products");
//     let consulta = coleccionDeProductos;

//     // Solo aplica el filtro si `name` tiene un valor
//     if (name && name !== "Todos") {
//       const coleccionFiltrada = query(
//         coleccionDeProductos,
//         where("category", "==", name)
//       );
//       consulta = coleccionFiltrada;
//     }

//     const getProducts = getDocs(consulta);

//     getProducts.then((res) => {
//       let newArray = res.docs.map((elemento) => {
//         return { id: elemento.id, ...elemento.data() };
//       });
//       setItems(newArray);
//     });
//   }, [name]);

//   return (
//     <div>
//       {/* Carrusel de imágenes */}
//       <ImageCarousel images={images} />

//       {/* Lista de productos */}
//       {items.length === 0 ? (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//           <ProductSkeleton />
//           <ProductSkeleton />
//           <ProductSkeleton />
//         </Box>
//       ) : (
//         <Grid
//           container
//           spacing={3} // Espacio entre los productos
//           sx={{
//             padding: "20px",
//             maxWidth: "1200px", // Ancho máximo del contenedor
//             margin: "0 auto", // Centra el contenedor
//           }}
//         >
//           {items.map((item) => (
//             <Grid
//               item
//               key={item.id}
//               xs={12} // 1 columna en móvil
//               sm={6} // 2 columnas en tablet
//               md={4} // 3 columnas en desktop
//             >
//               <ProductCard {...item} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </div>
//   );
// };

// export default ItemListContainer;

///ANTERIOR ANTERIOR
// import { useState, useEffect } from "react";
// import ProductCard from "../../common/productCard/ProductCard";
// import { useParams } from "react-router";
// import { Box } from "@mui/material";
// import ProductSkeleton from "../../common/productSkeleton/ProductSkeleton";
// import { db } from "../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import ImageCarousel from "../../common/imageCarousel/ImageCarousel";

// const images = [
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310377/165_ln6rel.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310459/197_fizpur.png",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310494/201_wzkwcf.png",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310516/200_jkadux.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310540/175_b2dyu9.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310569/190_hhaa5p.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310588/168_f3dbnv.jpg",
//   "https://res.cloudinary.com/dhwsxp2c8/image/upload/v1741310874/19-02-2025-11-02-24-Web_Banner_5000G_01_jxgahp.jpg",
// ];

// const ItemListContainer = () => {
//   const { name } = useParams();

//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const coleccionDeProductos = collection(db, "products");
//     let consulta = coleccionDeProductos;

//     if (name) {
//       const coleccionFiltrada = query(
//         coleccionDeProductos,
//         where("category", "==", name)
//       );
//       consulta = coleccionFiltrada;
//     }

//     const getProducts = getDocs(consulta);

//     getProducts.then((res) => {
//       let newArray = res.docs.map((elemento) => {
//         return { id: elemento.id, ...elemento.data() };
//       });
//       setItems(newArray);
//     });
//   }, [name]);

//   // const rellenar = () => {
//   //   let productsCollection = collection(db, "products");

//   //   products.forEach((product) => {
//   //     addDoc(productsCollection, product);
//   //   });
//   // };

//   return (
//     <div>
//       <ImageCarousel images={images} />
//       {/* <button onClick={rellenar}>Rellenar db</button> */}
//       {items.length === 0 ? (
//         <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//           <ProductSkeleton />
//           <ProductSkeleton />
//           <ProductSkeleton />
//         </Box>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             flexWrap: "wrap",
//             gap: "20px",
//             marginTop: "20px",
//           }}
//         >
//           {items.map((item) => (
//             <ProductCard key={item.id} {...item} />
//           ))}
//         </div>
//       )}
//       {/* <div style={{
//         display: "flex",
//         justifyContent: "space-around",
//         flexWrap: "wrap",
//         gap: "20px",
//         marginTop : "20px",
//         }}>

//         {items.map((item) => (
//           <ProductCard key={item.id} {...item} />
//           ))}

//           </div> */}
//     </div>
//   );
// };

// export default ItemListContainer;
