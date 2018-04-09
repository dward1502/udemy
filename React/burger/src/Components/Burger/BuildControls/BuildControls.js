import React from 'react';
import './buildControls.css';
import BuildControl from './BuildControl/buildcontrol';

const controls = [
   {label: 'Salad', type:'salad'},
   { label: 'Bacon', type: 'bacon' },
   { label: 'Cheese', type: 'cheese' },
   { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
   return (
      <div className='BuildControls'>
      <p>Current Price: <strong>{props.total.toFixed(2)}</strong></p>
        {controls.map(build =>{
         return <BuildControl added={() => props.ingredientAdded(build.type)}
         key={build.label}
         label={build.label}
           remove={() => props.ingredientRemove(build.type)}
           disabled={props.disabled[build.type]}
         />
        })}
        <button className='OrderButton' 
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
      </div>
   );
};

export default BuildControls;