import "./productCard.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = ({price, title, description, imageUrl}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={imageUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          ${price}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver detalle</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
// <div className='container-product'>
//     <img className='image' src={imageUrl} alt="" />
//     <h2>{title}</h2>
//     <h2>{price}</h2>
//     <h2>{stock}</h2>
//     <h2>{description}</h2>
//     <h2>{id}</h2>
//     <h2>{category}</h2>
//     <Button variant="contained" disabled={stock < 1}>Ver más</Button>
// </div>