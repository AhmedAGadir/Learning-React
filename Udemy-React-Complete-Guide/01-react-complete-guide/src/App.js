import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js'
// import Radium, { StyleRoot } from 'radium';

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
//writing properties like this is ES7
  state = {
    persons: [
      { id: 'dfsf', name: 'Ahmed', age: 24 },
      { id: '324', name: 'Razan', age: 27 },
      { id: 'ukiyu', name: 'Bob', age: 34 }
    ],
    otherState: 'some other value',
    showPersons: false,
  } 

  // using ES6 arrow functions allows us to use this.switchNameHandler in our class
  // switchNameHandler = (newName) => {
    // console.log(123)
    // DONT DO THIS: this.state.persons[0].name = 'Maximilian';
    // this.setState merges whatever you pass in it with your existing state, and then updates the DOM.
  //   this.setState({persons: [
  //     { name: newName, age: 24 },
  //     { name: 'Razan', age: 27 },
  //     { name: 'Bob', age: 2 }
  //   ]})
  // }

  deletePersonHandler = personInd => {
    const persons = [...this.state.persons];
    persons.splice(personInd, 1);
    this.setState({persons: persons})

  }

  nameChangedHandler = (event, id) => {
    // this.setState({persons: [
    //   { name: event.target.value, age: 24 },
    //   { name: 'Razan', age: 27 },
    //   { name: 'Bob', age: 2 }
    // ]})
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    // copy objects and arrays with the spread operator so that we dont mutate the state
    const person = {
      ...this.state.persons[personIndex]
    }
    // alternative approach
    // const person = Object.assign({}, this.state.persons[personIndex])
  
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }
  //in JSX, use an uppercase C in onClick 

  //you can pass methods also as props, so that you can call a method which might change the state, in another component which normally doesnt have access or the ability to change the state
  // the bind way is more efficient than the embedded arrow function way
  render() {
    // this method of inline styling allows you to scope the styling to individual elements
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      // ':hover': {
      //     backgroundColor: 'lightgreen',
      //     color: 'black',
      // }
    }

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, ind) => {
            return <Person 
              click={() => this.deletePersonHandler(ind)}
              changed={e => this.nameChangedHandler(e, person.id)}
              name={person.name} 
              age={person.age}
              // the key prop is an important property we should add when rendering list of data
              // every element should have a unqiue id so that React can compare elements of the future with elements of the past when re-rendering the DOM, and only re-render elements that have changed
              // dont use the index of the element in the list, as when the list is updated indexes may change.
              // if the key property is missing, react will re-render the whole list, which can be v. inefficient for long lists (especially if only one or two list items have changed).
              // in real data the chances are high that the data will give each element a unique ID.
              key={person.id} />
          })}       
        </div>
      );

      style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      // }
    }
          // <Person 
          //   name={this.state.persons[0].name} 
          //   age={this.state.persons[0].age}
          //   changed={this.nameChangedHandler}
          //   click={this.switchNameHandler.bind(this, 'Max!')}/>
          // <Person  
          //   name={this.state.persons[1].name} 
          //   age={this.state.persons[1].age} >My Hobbies: Racing</Person>
          // <Person 
          //   name={this.state.persons[2].name} 
          //   age={this.state.persons[2].age}/> 

    // as react doesnt allow block statements (like if..else statements) inside JSX 

    let classes = [];
    if (this.state.persons.length <= 2) classes.push('red');
    if (this.state.persons.length <= 1) classes.push('bold');


    return (
      // if using mediaqueres or keyframes, also import StyleRoot from Radium and wrap your whole application in it
      // not neccessary if you're just using psuedo-selectors - in that case just download and import radium, then wrap your exported component in the Radium function
      // both of these allow you to apply scoped styles, pseudo-selectors, media queries etc. to components
      // <StyleRoot>
      <div className="App">
      <h1>Hi, Im a React app</h1>
      <p className={classes.join(' ')}>This is really working!</p>
      <button
        style={style} 
        onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
      // </StyleRoot>    
      );
  }
}

// export default Radium(App);
export default App;