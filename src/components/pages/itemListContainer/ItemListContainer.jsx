import { useState, useEffect } from "react";
import { products } from "../../../products";
import ProductCard from "../../common/productCard/ProductCard";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getProducts = new Promise((resolve, reject) => {
      let permiso = true; // Cambia a true para probar el éxito
      if (permiso) {
        resolve(products);
      } else {
        reject({ status: 400, message: "Algo salió mal" });
      }
    });

    getProducts
      .then((res) => {
        setItems(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Se ejecuta solo al montar el componente

  return (
    <div>
      {/* <h2>Acá van a ir los productos</h2> */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
      }}>

      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
      
      </div>
    </div>
  );
};

export default ItemListContainer;