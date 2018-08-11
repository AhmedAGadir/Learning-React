import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'

// class App extends Component {

//   render() {
//     return (
//       <div className="App">
//       <h1>Hi, Im a React app</h1>
//       <p>This is really working!</p>
//       <button>Switch Name</button>
//       <Person name="Ahmed" age="24"/>
//       <Person name="Razan" age="27">My Hobbies: Racing</Person>
//       <Person name="Bob" age="39" />
//       </div>
//     );
//     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React app!!'))
//   }
// }


class App extends Component {
// Only class-based components can define and use state
// regardless, you should use function components as much as possible as over-using state makes an app difficult to manage
// state is a reserved word
  state = {
    persons: [
      { name: 'Ahmed', age: 24 },
      { name: 'Razan', age: 27 },
      { name: 'Bob', age: 34 }
    ],
    otherState: 'some other value'
  } 

  // using ES6 arrow functions allows us to use this.switchNameHandler in our class
  switchNameHandler = (newName) => {
    // console.log(123)
    // DONT DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({persons: [
      { name: newName, age: 24 },
      { name: 'Razan', age: 27 },
      { name: 'Bob', age: 2 }
    ]})
  }

  nameChangedHandler = event => {
    this.setState({persons: [
      { name: event.target.value, age: 24 },
      { name: 'Razan', age: 27 },
      { name: 'Bob', age: 2 }
    ]})
  }


  //in JSX, use an uppercase C in onClick 

  //you can pass methods also as props, so that you can call a method which might change the state, in another component which normally doesnt have access or the ability to change the state
  // the bind way is more efficient than the embedded arrow function way
  render() {
    // this method of inline styling allows you to scope the styling to individual elements
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }


    return (
      <div className="App">
      <h1>Hi, Im a React app</h1>
      <p>This is really working!</p>
      <button
        style={style} 
        onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button>
      <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}
        changed={this.nameChangedHandler}
        click={this.switchNameHandler.bind(this, 'Max!')}/>
      <Person  
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age} >My Hobbies: Racing</Person>
      <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}/>
      </div>
    );
  }
}

export default App;
