import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit.js';
// import Radium, { StyleRoot } from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary.js';


// why should you use functional components as often as possible?
// because these components have a narrow focus and a clear responsibility - they are about rendering something.
// they dont manage state 

// containers manage state, but having too many containers will quickly make things confusing


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



// containers shouldnt be involved with the UI components too much, they should focus on managing the state and let individual components manage the JSX/JavaScript.
class App extends Component {

  // this way of creating classes is old, ES7 allows us to omit the constructor property and replace the e.g. (this.foo = foobar) syntax with (foo = foobar)
  constructor (props) {
    super(props)
    // inisde of the constructor we can use props, everywhere else we'd have to use this.props
    console.log('[App.js] Inside Constructor')
    // this.state = {} //old way of initializing state
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }
 
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')    
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('[UPDATE App.js] Inside componentWillReceiveProps() ', nextProps)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate() ', nextProps, nextState)
  //   return true;
  // }

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

  // using ES6 arrow functions allows us to use the this keyword inside our function easily. ===> arrow functions make it so that whatever the this value is in the lexical scope that the function was defined, has the same this value inside the function -- see YDKJS
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
  // render is the only mandatory function that must be defined inside of a class based component, as react needs to know what to render to the DOM
  render() {
        console.log('[App.js] Inside render()')

    // this method of inline styling allows you to scope the styling to individual elements
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
      // ':hover': {
      //     backgroundColor: 'lightgreen',
      //     color: 'black',
      // }
    //}

    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons 
              persons={this.state.persons} 
              clicked={this.deletePersonHandler} 
              changed={this.nameChangedHandler}/>      

      // style.backgroundColor = 'red';
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

    return (
      //our App class also has access to a props property that it gets from React.Component

      // if using mediaqueres or keyframes, also import StyleRoot from Radium and wrap your whole application in it
      // not neccessary if you're just using psuedo-selectors - in that case just download and import radium, then wrap your exported component in the Radium function
      // both of these allow you to apply scoped styles, pseudo-selectors, media queries etc. to components
      // <StyleRoot>
      <div className={classes.App}>
        <Cockpit
          title={this.props.title} 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}/>
        {persons}
      </div>
      // </StyleRoot>    
      );
  }
}

// export default Radium(App);
export default App;