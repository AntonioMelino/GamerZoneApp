import CartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { CartContext } from '../../../context/CartContext';

const CartWidget = () => {
  const {getTotalQuantity} = useContext(CartContext);
  const total = getTotalQuantity()

  return (
    <div>

        <Badge badgeContent={total} color="secondary" showZero={true}>
          <CartIcon/>
        </Badge>

    </div>
  )
}

export default CartWidget