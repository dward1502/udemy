import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavigationItems/NavigationItems';
import  './SideDrawer.css';

const SideDrawer = (props) => {


   return (
      <div className='SideDrawer'>
      <div>
         <Logo/>
      </div>
         <nav>
            <NavItems/>
         </nav>
      </div>
   );
};

export default SideDrawer;