import React, { Component } from 'react';
import Burger from '../../Components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <div>
                <Burger/>
                <div>Build Controller</div>
            </div>
        );
    }
}

export default BurgerBuilder;