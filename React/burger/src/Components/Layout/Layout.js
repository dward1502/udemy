import React from 'react';

const Layout = (props) => {
    return (
        <div>
            <div>Toolbar, SideDrawer,Backdrop</div>
            <main className='container'>
                {props.children}
            </main>
        </div>
    );
};

export default Layout;