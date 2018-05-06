import React from 'react';
import img from '../../Assets/Images/burger-logo.png';
import classes from  './logo.css';

const Logo = (props) => {
   return (
      <div className={classes.Logo}>
         <img src={img} alt='MyBurger'/>
      </div>
   )
};

export default Logo;