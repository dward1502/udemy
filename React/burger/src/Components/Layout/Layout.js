import React from 'react';
import classes from "./layout.css";

// import Aux from '../../HOC/Auxiliary';


const Layout = (props) => {
      return(
         <div>
            <div>Toolbar, SideDrawer, Backdrop </div>
            <main className={classes.container}>
               {props.children}
            </main>
         </div>
      )
};

export default Layout;