import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigation from '../NavigationItems/NavigationItems';
import DrawerToggle from './../SideDrawer/DrawerToggle';

const Toolbar = (props) => {

   return (
      <header className={classes.Toolbar}>
        <DrawerToggle click={props.drawerToggleClicked}/>
         <div className={classes.Logo}>
            <Logo/>
         </div>
         <nav className={classes.DesktopOnly}>
            <Navigation/>
         </nav>
      </header>
   );
};

export default Toolbar;