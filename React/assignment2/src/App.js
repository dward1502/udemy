import React, { Component } from 'react';
import Val from './Validation/validate';
import Char from './Char/char';
import './App.css';

class App extends Component {
  state={
    input: "",
  }
  inputListener = (event) =>{
      this.setState({input: event.target.value});
      const info = this.state.input;
      this.setState({length: info.length});  
  }
  deleteChar = (index) =>{
    const text = this.state.input.split('');
    text.splice(index,1);
    const updateText = text.join('');
    this.setState({input: updateText});
  }
  render() {

    const charList = this.state.input.split('').map((list, index) =>{
      return <Char 
      character={list} 
      key={index}
      clicked={() => this.deleteChar(index)}/>
    });
    return (
      <div className="App">
        <ol>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

        <input type="text" onChange={this.inputListener} 
        value={this.state.input}/>
        <p>{this.state.input}</p>
        <Val textLen={this.state.input.length}/>
        {charList}
      </div>
    );
  }
}

export default App;
