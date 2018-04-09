import React from 'react';
import img from '../../Assets/Images/burger-logo.png';
import  './logo.css';

const Logo = (props) => {
   return (
      <div className='Logo'>
         <img src={img} alt='MyBurger'/>
      </div>
   )
};

export default Logo;