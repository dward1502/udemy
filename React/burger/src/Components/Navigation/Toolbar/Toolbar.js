import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigation from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
   return (
      <header className='Toolbar'>
         <div>Menu</div>
         <div>
         <Logo/>
         </div>
         <nav>
            <Navigation/>
         </nav>
      </header>
   );
};

export default Toolbar;