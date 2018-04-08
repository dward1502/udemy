import React, { Component } from 'react';
import './App.css';
import Person from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import Radium, { StyleRoot } from 'radium';
import person from './../Components/Persons/Persons';

class App extends Component {
  state ={
    persons: [
      {name:"dan",age:"30"},
      {name:"rosie",age:35},
      {name:"laura",age:2}
    ],
    showPersons : false
  }

  switchNameHandler = (newName) =>{
    console.log("WAs clicked");
    //Dont do this : this.state.persons[0].name - 'Daniel';
    this.setState(
      { persons: [{ name: newName, age: "30",id: 12 }, { name: "rosie", age: 27, id:'asdadw' }, { name: "laura", age: 2, id:'132313' }] })
  }
  nameChangedHandler = (event, id) =>{
    const personIndex = this.state.persons.findIndex(per=>{
      return per.id === id;
    });

    const person ={ ...this.state.persons[personIndex]};
    person.name = event.target.value;
    const persons = [...this.state.persons];    
    person[personIndex] = person;
    this.setState({ persons: [{ name: "Daniel", age: "30" }, { name: "rosie", age: 27 }, { name: event.target.value , age: 2 }] })
  }
  togglePersonsHandler =()=>{
      const doesShow = this.state.showPersons;
      this.setState({showPersons: !doesShow});
      //doesShow is false will set to true if true will set to false
  }
  deletePersonHandler = (personIndex)=>{
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }
  render() {
    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
         <Person persons={this.state.persons} 
         clicked={this.deletePersonHandler}
         changed={this.nameChangedHandler}
         />
        </div> 
      );
      //dynamicly change the css by nesting it inside the function that you want it to change in
      style.backgroundColor = 'red';
      style[':hover']={
        backgroundColor:'salmon',
      }
    }
    
   
    return (
      <StyleRoot>
      <div className="App">
       <Cockpit
       showPersons={this.state.showPersons}
       persons={this.state.persons}
       clicked={this.togglePersonsHandler}
       />
       
         
      </div>
      </StyleRoot>
    );    
}
}

export default Radium(App);
