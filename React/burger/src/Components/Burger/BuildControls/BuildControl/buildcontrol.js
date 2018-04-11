import React from 'react';
import classes from './buildcontrol.css';

const buildcontrol = (props) => {
   return (
      <div>
         <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.remove} 
            disabled={props.disabled}>Less</button>
            <button className={classes.More} 
            onClick={props.added}>More</button>
         </div>
      </div>
   );
};

export default buildcontrol;