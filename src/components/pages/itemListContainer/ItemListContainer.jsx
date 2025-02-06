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
      <h2>Acá van a ir los productos</h2>
      {items.map((item) => (
        <ProductCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ItemListContainer;






// import PropTypes from "prop-types";
// import { useState } from "react";
// import { products } from "../../../products";
// import ProductCard from "../../common/productCard/ProductCard";


// const ItemListContainer = () => {
  
//   const [items, setItems] = useState([]);

//   const getProducts = new Promise((resolve, reject) => {
//     let permiso = false;
//     if(permiso){
//       resolve(products);
//     }else{
//       reject({status: 400, message: "also salio mal"});
//     }
//   });
  
//   getProducts
//     .then((res)) => {
//       setItems(res)
//     })
//     .catch((error))=>{
//       console.log(error);
//     });


//   return (
//     <div>
//       <h2> Aca van a ir los productos </h2>
//       {items.map((item) => {
//         return(
//           <ProductCard
//           key={item.id}
//           {...item}
//           />
//         );
//       })}
//     </div>
//   )
// }

// export default ItemListContainer





// const ItemListContainer = ({ greeting }) => {
//   return (
//     <div style={{ padding: "20px", border: "1px solid #ccc", textAlign: "center", borderRadius: "8px" }}>
//       <h2>{greeting}</h2>
//     </div>
//   )
// }

// ItemListContainer.propTypes = {
//     greeting: PropTypes.string.isRequired,
//   };

// export default ItemListContainer