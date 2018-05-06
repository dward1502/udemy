import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavigationItems = (props) => {
   return (
      <div>
         <ul className={classes.NavigationItems}>
            <NavItem link='/' exact>Burger Builder</NavItem>
            <NavItem link='/orders'>Orders</NavItem>
         </ul>
      </div>
   );
};

export default NavigationItems;