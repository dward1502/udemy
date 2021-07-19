import React from 'react';
import './ExpenseItem.css';

function ExpenseItem( ){
  const expenseDate = new Date(2021,2,28)
  return (
    <div className='expense-item'>
      <div className='expense-item__description'>{expenseDate}</div>
      <div>
        <h2>Car Insurance</h2>
        <div className='expense-item__price'>279.81</div>
      </div>
    </div>
  );
}

export default ExpenseItem;
