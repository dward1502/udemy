import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = (props) => {
   return (
      <div>
         <ul className={classes.NavigationItems}>
            <NavItem link='/'>Burger Builder</NavItem>
            <NavItem link='/'>Checkout</NavItem>
         </ul>
      </div>
   );
};

export default NavigationItems;