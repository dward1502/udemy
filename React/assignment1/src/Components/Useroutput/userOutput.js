import React from 'react';

const userOutput = (props) => {
   return (
      <div>
         <p>{props.username} {props.info}</p>
         <p>{props.info2}</p>
      </div>
   );
};

export default userOutput;