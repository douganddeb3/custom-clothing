// import {useContext} from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

// import {CartContext} from '../../contexts/cart.context';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { useDispatch } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles';


const CartDropdown = () => {
    const cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);

    const goToCheckoutHandler = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        navigate('/checkout');
    };
    // const goToCheckoutHandler = useCallback(() => {
    //     navigate('checkout');
    // }, [navigate]);
    return(
        <CartDropdownContainer>
        <CartItems>
            {
              cartItems.length ? (cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item}/>
            ))) : (
             <EmptyMessage>Your cart is empty</EmptyMessage>
            )
            }
        </CartItems>
            
        <Button onClick={goToCheckoutHandler }>Checkout</Button>
        
       </CartDropdownContainer> 
    );
};

export default CartDropdown;