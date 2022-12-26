import { Fragment } from 'react';
// useContext
import {Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

// import { CartContext } from '../../contexts/cart.context';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
// import { signOutUser } from '../../utils/firebase/firebase.utils';
import { signOutStart } from '../../store/user/user.action';

import {NavigationContainer, NavLinks, NavLink, LogoContainer} from './navigation.styles';

import { selectCurrentUser } from '../../store/user/user.selector';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser =  useSelector(selectCurrentUser);
    // const { isCartOpen}  = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen); 
    const signOutUser = () => dispatch(signOutStart());
    return(

    <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo'/>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>)
                        : (<NavLink  to='/auth'>
                            Sign In
                          </NavLink>
                    )
                }
                <CartIcon />
                

            </NavLinks>
            { isCartOpen && <CartDropdown />}
        
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;