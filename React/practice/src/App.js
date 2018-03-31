import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state ={
    persons: [{name:"dan",age:"30"},{name:"rosie",age:35},{name:"laura",age:2}]
  }

  switchNameHandler = (newName) =>{
    console.log("WAs clicked");
    //Dont do this : this.state.persons[0].name - 'Daniel';
    this.setState({ persons: [{ name: newName, age: "30" }, { name: "rosie", age: 27 }, { name: "laura", age: 2 }] })
  }
  nameChangedHandler = (event) =>{
    this.setState({ persons: [{ name: "Daniel", age: "30" }, { name: "rosie", age: 27 }, { name: event.target.value , age: 2 }] })
  }
  render() {
    return (
      <div className="App">
        <h1>Hi, i am a react app</h1>
        <button onClick={()=> this.switchNameHandler("Daniel Ward")}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} >My Hobbies : Surfing</Person>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!')}/>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
      
    );    
}
}

export default App;
