const ProductCard = ({price, title, stock, description, imageUrl, id, category}) => {
  return (
    <div style = {{border : "2px solid black"}}>
        <img src={imageUrl} alt="" />
        <h2>{title}</h2>
        <h2>{price}</h2>
        <h2>{stock}</h2>
        <h2>{description}</h2>
        <h2>{id}</h2>
        <h2>{category}</h2>
    </div>
  )
}

export default ProductCard