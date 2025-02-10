import { useEffect, useState } from "react";
import { products } from "../../../products";
import Counter from "../../common/counter/Counter";

const ItemDetail = () => {

    let id = "3";

    const [item, setItem] = useState([]);

    useEffect(() =>{
        let producto = products.find((product) => product.id === id);
        setItem(producto);
    }, [id]);

  return (
    <div>
        <h2>{item.title}</h2>
        <h4>{item.description}</h4>
        <Counter item={item}/>
    </div>
  )
}

export default ItemDetail