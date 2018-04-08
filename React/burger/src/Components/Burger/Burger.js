import React from 'react';
import './burger.css';
import Ingredients from './Ingredients/Ingredients';
const Burger = (props) => {
    return (
        <div>
            <div className='Burger'>
                <Ingredients type='bread-top'/>
                <Ingredients type='cheese'/>
                <Ingredients type='meat'/>
                <Ingredients type='bread-bottom'/>
            </div>
        </div>
    );
};

export default Burger;