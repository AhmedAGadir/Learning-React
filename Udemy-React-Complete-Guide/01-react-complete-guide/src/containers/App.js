import React, { PureComponent } from 'react';
//only use PureComponent when you know that updates may not be required
// PureComponent is the same as Component, it just also does a shallowcheck automatically when changes are made, and only updates if props/state has changed
import classes from './App.css';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit.js';
// import Radium, { StyleRoot } from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary.js';
// import WithClass from '../hoc/WithClass.js'
import Aux from '../hoc/Auxiliary.js'
import withClass2 from '../hoc/withClass2.js';

// The context API allows us to pass data around without having to set a chain of props
// still the props approach is recommended as it makes components more reusable and doesnt tie them together that much
// still the context API is great for passing around global settings
// can set up a default value in createContext -> false is not authenticated
export const AuthContext = React.createContext(false)

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
class App extends PureComponent {

  // this way of creating classes is old, ES7 allows us to omit the constructor property and replace the e.g. (this.foo = foobar) syntax with (foo = foobar)
  constructor (props) {
    super(props)
    // inisde of the constructor we can use props, everywhere else we'd have to use this.props
    console.log('[App.js] Inside Constructor')
    // this.state = {} //old way of initializing state
  }

  // discouraged to use - see NEW in person.js
  componentWillMount() {
    console.log('[App.js] Inside componentWillMount()')
  }
 
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount()')    
  }

  // the reason we use shouldComponentUpdate is because, whenever a change is made to the state or props of a component, the render methods of the whole tree are called ....
  // ... this doesnt mean that the actual DOM is re-rendered again, its not. but nonetheless the render methods are called - even if nothing changes! ...
  // ... this can be really inefficient with large applications where render methods are being called for loads of elements, although nothings changing
  // ... for this reason we use shouldComponentUpdate

  // if we chose to inherit from PureComponent, the shallow check performed below is done automatically and so we dont need to do it
  // it will look through all the properites in the props/state, and only continue updating if it detects changes 
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate() ', nextProps, nextState)
  //   return nextState.persons !== this.state.persons ||
  //   nextState.showPersons !== this.state.showPersons;
  // }

  // discouraged to use - see NEW in person.js
  componentWillUpdate = (nextProps, nextState) => {
    console.log('[UPDATE App.js] Inside componentWillUpdate() ', nextProps, nextState)
  }

  componentDidUpdate(nextProps, nextState) {
     console.log('[UPDATE App.js] Inside componentDidUpdate() ', nextProps, nextState)   
  }

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
    toggleClicked: 0,
    authenticated: false,
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
    // set state is a method executed asynchronously by react,so you cant rely on updating the state like this: 
    // this.setState({
    //   showPersons: !doesShow,
    //   toggleClicked: this.state.toggleClicked + 1,
    // })
    // if you want to use the current state in your updated state, use the function syntax
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1,
      }
    })
  }

  loginHandler = () => {
    this.setState({authenticated: true})
  }

  //in JSX, use an uppercase C in onClick 

  // render() doesnt immediately render JSX to the main DOM...
  // ... render() compares virtual DOMs - it has an old virutal DOM and a re-rendered virtual DOM.
  // ... if there are differences -> THEN React updates only the sections of the DOM that have changed.
  // ... this is useful because accessing the real DOM is much slower than accessing the virtual ones
  // you can pass methods also as props, so that you can call a method which might change the state, in another component which normally doesnt have access or the ability to change the state
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
              changed={this.nameChangedHandler} />      

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
      // the first buttons sets showPersons to always be true (no toggling), the second button toggles showPersons
      //<WithClass classes={classes.App}>
      <Aux>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit
          title={this.props.title} 
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}/>
          <AuthContext.Provider value={this.state.authenticated}>
            {persons}
          </AuthContext.Provider>
      </Aux>
      //</WithClass>
      // </StyleRoot>    
    );
  }
}
export default withClass2(App, classes.App);