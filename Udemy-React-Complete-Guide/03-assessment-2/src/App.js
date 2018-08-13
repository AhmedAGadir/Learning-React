import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent.js'
import CharComponent from './CharComponent/CharComponent.js'

class App extends Component {

  state = {
    input: '',
  }

  updateHandler = e => {
    this.setState({input: e.target.value,})
  }

  removeHandler = (e, ind) => {
    let inputArr = this.state.input.split('');
    inputArr.splice(ind, 1);
    this.setState({input: inputArr.join('')})
  }


  render() {
    let chars = null;
    if (this.state.input) {
      chars = (
        <div>
          {this.state.input.split('').map((char, ind) => {
            return <CharComponent char={char} click={e => this.removeHandler(e, ind)}/>
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Assessment 3</h1>
        <input type="text" onChange={this.updateHandler} value={this.state.input}/>
        <p>Length: {this.state.input.length}</p>
        {(this.state.input) ? <ValidationComponent len={this.state.input.length} /> : null}
        {chars}
      </div>
    );
  }
}

export default App;
