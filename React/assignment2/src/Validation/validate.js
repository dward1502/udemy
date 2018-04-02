import React from 'react';

const Validate = (props) => {
   let validateMessage = 'Text long enough';

   if(props.textLen <= 5){
      validateMessage = 'Text too short'
   }

   return (
      <div>
         <p>{validateMessage}</p>
      </div>
   );
};

export default Validate;