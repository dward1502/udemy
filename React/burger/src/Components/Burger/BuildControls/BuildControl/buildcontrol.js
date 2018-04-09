import React from 'react';

const buildcontrol = (props) => {
   return (
      <div>
         <div className='BuildControl'>
            <div className='Label'>{props.label}</div>
            <button className='Less' onClick={props.remove} 
            disabled={props.disabled}>Less</button>
            <button className='More' 
            onClick={props.added}>More</button>
         </div>
      </div>
   );
};

export default buildcontrol;