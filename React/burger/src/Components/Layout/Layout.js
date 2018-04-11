import React, { Component} from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        visible: false
    }
    sideDrawerClosed = () =>{
        this.setState({visible:false});
    }
    sideDrawerHandler=()=>{
        this.setState((prevState)=>{
            return {visible:!prevState.visible}
        });
    }
    render(){
        return (
            <div>
                <Toolbar drawerToggleClicked={this.sideDrawerHandler}/>
                <SideDrawer open={this.state.visible} closed={this.sideDrawerClosed}/>
                <main className={classes.container}>
                    {this.props.children}
                </main>
            </div>
        );
    }
};

export default Layout;