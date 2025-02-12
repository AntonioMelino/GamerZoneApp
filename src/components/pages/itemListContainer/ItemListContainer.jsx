import { useState, useEffect } from "react";
import { products } from "../../../products";
import ProductCard from "../../common/productCard/ProductCard";
import { useParams } from "react-router";

const ItemListContainer = () => {
  const {name} = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    let arrayFiltrado;
      if(name){
        arrayFiltrado= products.filter((elemento) => elemento.category === name)
      }
    const getProducts = new Promise((resolve, reject) => {
      let permiso = true; // Cambia a true para probar el éxito
      if (permiso) {
        resolve(name ? arrayFiltrado : products);
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
  }, [name]); // Se ejecuta solo al montar el componente

  return (
    <div>
      {/* <h2>Acá van a ir los productos</h2> */}
      <div style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "20px",
        marginTop : "20px",
      }}>

      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
      
      </div>
    </div>
  );
};

export default ItemListContainer;