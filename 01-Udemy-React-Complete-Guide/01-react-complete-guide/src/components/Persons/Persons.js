import React, { PureComponent } from 'react';
import Person from './Person/Person';

// ========== COMPONENT LIFECYCLE =========
// see console to see the lifecycle in action
// 1) constructor(props)
// 2) [DISCOURAGED] componentWillMount()
// 3) render()
// 4) render child components
// 5) componentDidMount()
// -- UPDATE --
//   [DISCOURAGED] componentWillReceiveProps(nextProps)
//   shouldComponentUpdate(nextProps, nextState)
//   [DISCOURAGED] componentWillUpdate(nextProps, nextState)
//   [NEW] getDerivedStateFromProps() 
//   render()
//   [NEW] getSnapshotBeforeUpdate
//   update child component props 
//   componentDidUpdate(nextProps, nextState)
 

// const persons = props => props.persons.map((person, ind) => {
//             return /*<ErrorBoundary key={person.id}>*/ (<Person 
//               click={() => props.clicked(ind)}
//               changed={e => props.changed(e, person.id)}
//               name={person.name} 
//               age={person.age}
//               // the key prop is an important property we should add when rendering list of data
//               // every element should have a unqiue id so that React can compare elements of the future with elements of the past when re-rendering the DOM, and only re-render elements that have changed
//               // dont use the index of the element in the list, as when the list is updated indexes will change.
//               // if the key property is missing, react will re-render the whole list, which can be v. inefficient for long lists (especially if only one or two list items have changed).
//               // in real data the chances are high that the data will give each element a unique ID.
//               key={person.id} />)
//               //</ErrorBoundary>
//               //ErrorBoundary is a higher order component => its a component which wraps another component, with the goal of handling any errors that component might throw
//               // note how the key property has moved to error boundary -> this is simply because the key property has to be on the outermost element of the list being rendered.
//               //only use error boundaries where they make sense.
//           })


// turning persons into a stateful component
// if you need access to a lifecycle method, you need to have a stateful component
// i.e. a function created by extending React.Component

// if you have a use-case where you have a component which receives a lot of props, but it should re-render only if one of these props changes, 
// then its a good idea to turn the component into a stateful component, and use shouldComponentUpdate to only change the relevant property (as is done below);
class Persons extends PureComponent  {
  // set up state here
  // dont cause side effects
  constructor (props) {
    super(props)
    console.log('[Persons.js] Inside Constructor');
    this.state = {
      foo: 'bar',
    };
    this.lastPersonRef = React.createRef();
  }

  // discouraged to use - see NEW
  // update state here
  // dont cause side effects
  componentWillMount() {
    console.log('[Persons.js] Inside componentWillMount()')
  }

  // here you can cause side effects (also in componentDidUpdate) - e.g. making ajax calls 
  // dont change state here, it will cause a re-render (unless thats what you're looking to do - like the clock example in the react documentation tutorials)
  componentDidMount() {
    console.log('[Persons.js] Inside componentDidMount()');
    this.lastPersonRef.current.focus();    
  }

  // discouraged to use - see NEW 
  // doesnt run when a component is first rendered, only when its about to be updated 
  // also doesnt run if the update is caused by a change in state, as opposed to a change in props.
  componentWillReceiveProps(nextProps) {
    console.log('[UPDATE Persons.js] Inside componentWillReceiveProps() ', nextProps)
  }

  // we can chose whether to cancel the update or not here
  // must return true or false
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js] Inside shouldComponentUpdate() ', nextProps, nextState)
  //   // this works because of the way the persons property is updated (see deletePersonHandler in App.js)
  //   // the spread operator is used to make a new object, so that when the check below is done, its clear that there are 2 different objects
  //   // this works because, as stated in the react documentation, all react properties must be pure (not changing things outside of their scope)
  //   // you can choose to change if only one prop changes 
  //   // return nextProps.persons !== this.props.persons;
  //   // or you change chose to change if any of the relevant props change
  //   return nextProps.persons !== this.props.persons ||
  //   nextProps.changed !== this.props.changed ||
  //   nextProps.clicked !== this.props.clicked;
  //   // return true;
  //   // instead of doing all of this - you can jut use purecomponent
  // }

  // discouraged to use - see NEW 
  //using arrow functions for these is also fine
  componentWillUpdate = (nextProps, nextState) => {
    console.log('[UPDATE Persons.js] Inside componentWillUpdate() ', nextProps, nextState)
  }

  // NEW
  // executed when props are updated
  // gives a chance to update state too before code renders
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('[UPDATE Persons.js] Inside getDerivedStateFromProps() ', nextProps, prevState)

    // return a new state if you want
    return prevState
  }

  // NEW
  // exercutes right before componentDidUpdate 
  // allows you to get a snapshot of your DOM right before its about to update
  // useful for e.g. saving the current scrolling position of a user
  getSnapshotBeforeUpdate() {
    console.log('[UPDATE Persons.js] Inside getSnapshotBeforeUpdate() ')
  }

  // here you can cause side effects, just like componentDidMount
  componentDidUpdate(nextProps, nextState) {
     console.log('[UPDATE Persons.js] Inside componentDidUpdate() ', nextProps, nextState)   
  }

  // here you prepare and structure JSX Code
    render() {
    console.log('[Persons.js] Inside render()')    
    return this.props.persons.map((person, ind) => {
            return (
              <Person 
              click={() => this.props.clicked(ind)}
              position={ind}
              changed={e => this.props.changed(e, person.id)}
              name={person.name} 
              age={person.age}
              key={person.id}
              ref={this.lastPersonRef} />)
          })
  }
}



export default Persons