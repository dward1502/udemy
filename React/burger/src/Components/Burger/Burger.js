import React from 'react';
import classes from './burger.css';
import Ingredients from './Ingredients/ingredients';

const Burger = (props) => {
   return (
      <div>
         <div className={classes.Burger}>
            <Ingredients type='bread-top/'>
            <Ingredients type='cheese'/>
            <Ingredients type='meat'/>
            <Ingredients type='bread-bottom'/>
         </div>
      </div>
   );
};

export default Burger;