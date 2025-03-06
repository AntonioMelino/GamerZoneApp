import { useState, useEffect } from "react";
import ProductCard from "../../common/productCard/ProductCard";
import { useParams } from "react-router";
import { Box } from "@mui/material";
import ProductSkeleton from "../../common/productSkeleton/ProductSkeleton";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
  const { name } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const coleccionDeProductos = collection(db, "products");
    let consulta = coleccionDeProductos;

    if (name) {
      const coleccionFiltrada = query(
        coleccionDeProductos,
        where("category", "==", name)
      );
      consulta = coleccionFiltrada;
    }

    const getProducts = getDocs(consulta);

    getProducts.then((res) => {
      let newArray = res.docs.map((elemento) => {
        return { id: elemento.id, ...elemento.data() };
      });
      setItems(newArray);
    });
  }, [name]);

  // const rellenar = () => {
  //   let productsCollection = collection(db, "products");

  //   products.forEach((product) => {
  //     addDoc(productsCollection, product);
  //   });
  // };

  return (
    <div>
      {/* <button onClick={rellenar}>Rellenar db</button> */}
      {items.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {items.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      )}
      {/* <div style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
        marginTop : "20px",
        }}>
        
        {items.map((item) => (
          <ProductCard key={item.id} {...item} />
          ))}
          
          </div> */}
    </div>
  );
};

export default ItemListContainer;
