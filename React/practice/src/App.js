import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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
          {this.state.persons.map((person,index) =>{
            return <Person 
            click={()=>this.deletePersonHandler(index)} 
            name={person.name}
            key={person.id}  
            age={person.age} 
            changed = {(event)=>this.nameChangedHandler(event,person.id)}/>
          })}
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} >My Hobbies : Surfing</Person>
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age} click={this.switchNameHandler.bind(this, 'Max!')} />
          <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}
        </div> 
      )
    }
    return (
      <div className="App">
        <h1>Hi, i am a react app</h1>
        <button onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
         
      </div>
    );    
}
}

export default App;
