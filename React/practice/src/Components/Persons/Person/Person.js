import React from 'react';

const Person = (props) => {
   return (
      <div>
         <p onClick={props.click}>I'm {props.name} and I am {props.age}</p>
         <p>{props.children}</p>
         <input type='text' onChange={props.changed}/>
      </div>
   );
};

export default Person;