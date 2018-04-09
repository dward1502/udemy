import React from 'react';
import './NavItem.css';

const NavItem = (props) => {
   return (
      <div>
         <ul>
            <li className='NavItem'>
               <a href={props.link}>{props.children}</a>
            </li>
         </ul>
      </div>
   );
};

export default NavItem;