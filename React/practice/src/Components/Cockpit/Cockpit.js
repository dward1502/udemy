import React from 'react';
import classes from './cockpit.css';
import Person from '../Persons/Persons';

const Cockpit = (props) => {
   const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
         backgroundColor: 'lightgreen',
         color: 'black',
      }
   }
    let persons = null;
   if (props.showPersons) {
      // persons = (
      //    <div>
      //       <Person persons={props.persons}
      //          clicked={props.deletePersonHandler}
      //          changed={props.nameChangedHandler}
      //       />
      //    </div>
      // );
      //dynamicly change the css by nesting it inside the function that you want it to change in
      style.backgroundColor = 'red';
      style[':hover'] = {
         backgroundColor: 'salmon',
      }
   }
   //array of string with class name, creates an array of one string "red bold"
   //let classes = ['red','bold'].join(' '); 
   let classes = [];
   if (props.persons.length <= 2) {
      classes.push('red');
   }
   if (props.persons.length <= 1) {
      classes.push('bold');
   }
   return (
      <div >
         <h1>Hi, i am a react app</h1>
         <p className={classes.join(' ')}>This is working</p>
         <button style={style} onClick={props.clicked}>Switch Name</button>
         {persons}

      </div>
   );
};

export default Cockpit;