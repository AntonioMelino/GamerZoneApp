import { useEffect, useState } from "react";
import { products } from "../../../products";
import Counter from "../../common/counter/Counter";
import { useParams } from "react-router";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ItemDetail = () => {

  const {id} = useParams();

    const [item, setItem] = useState([]);

    useEffect(() =>{
        let producto = products.find((product) => product.id === id);
        setItem(producto);
    }, [id]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={item.imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Counter item={item}/>
      </CardActions>
    </Card>
  )
}

export default ItemDetail
// <div>
//     <h2>{item.title}</h2>
//     <h4>{item.description}</h4>
//     <Counter item={item}/>
// </div>