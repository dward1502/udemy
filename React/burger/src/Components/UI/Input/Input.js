import React from 'react';
import classes from './Input.css';

const Input = (props) => {
   let inputEl = null;

   switch(props.elementtype){
      case('input'):
         inputEl = <input className={classes.inputEl} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
      case('textarea'):
         inputEl = <textarea className={classes.inputEl} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
      break;
      case('select'):
         inputEl = <select className={classes.inputEl} value={props.value} onChange={props.changed}>
        {props.elementConfig.options.map(option =>(
           <option value={option.value} >{option.displayValue}</option>
        ))}
         </select>
         break;
      default:
         inputEl = <input className={classes.inputEl} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
   }
   return (
      <div className={classes.Input}>
         <label className={classes.label}>{props.label}</label>
         {inputEl}
      </div>
   );
};

export default Input;