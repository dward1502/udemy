import React from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    return (
        <div>
            <Toolbar/>
            <SideDrawer/>
            <main className='container'>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;