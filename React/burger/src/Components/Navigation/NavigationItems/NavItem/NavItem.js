import React from 'react';
import classes from './NavItem.css';

const NavItem = (props) => {
   return (
      <div>
         <ul>
            <li className={classes.NavItem}>
               <a href={props.link}>{props.children}</a>
            </li>
         </ul>
      </div>
   );
};

export default NavItem;