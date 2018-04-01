import React, { Component } from 'react';
import Input from './UserInput/userinput';
import Output from './UserOutput/useroutput';
import './App.css';

class App extends Component {
  state={
   username: "Dan"
  }

  inputName = (event) =>{
    this.setState({username:event.target.value})
  }
  render() {
    return (
      <div className="App">
        <Input change={this.inputName} placeholder={this.state.username}/>
        <Output username={this.state.username}/>
        <Output username={this.state.username} />
        <Output username="george"/>
        <ol>             
          
                    
          <li>Add two-way-binding to your input (in UserInput) to also display the starting username</li>
          <li>Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets</li>
        </ol>
      </div>
    );
  }
}

export default App;
