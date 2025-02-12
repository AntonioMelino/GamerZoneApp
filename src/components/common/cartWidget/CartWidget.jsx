import CartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

const CartWidget = () => {
  return (
    <div>

        <Badge badgeContent={4} color="primary" showZero={true}>
          <CartIcon/>
        </Badge>

    </div>
  )
}

export default CartWidget