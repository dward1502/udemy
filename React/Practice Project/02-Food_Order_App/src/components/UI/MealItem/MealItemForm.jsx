import React, { useRef, useState } from 'react';
import Input from '../Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    const [isValid,setIsValid]=useState(true)
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
        setIsValid(false)
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  
  return (
    <form className={classes.form}>
      <Input
        label='Amount'
        ref={amountInputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button onClick={submitHandler}>+ Add</button>
      {!isValid && <p>Please enter a vlid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
