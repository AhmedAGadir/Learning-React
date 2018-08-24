import React, { Component } from 'react';
import classes from './Person.css';
// import Radium from 'radium';
//import WithClass from '../../../hoc/WithClass.js'
import withClass2 from '../../../hoc/withClass2.js';
import Aux from '../../../hoc/Auxiliary.js';
//first write npm install --save prop-types
import PropTypes from 'prop-types';

import { AuthContext } from '../../../containers/App.js'

// const person = (props) => {
// 	// const style = {
// 	// 	'@media (min-width: 500px)': {
// 	// 		width: '450px'
// 	// 	}
// 	// }

// 	// if (Math.random() > 0.7) {
// 	// 	throw new Error('Something went wrong');
// 	// }

// 	return (
// 		<div className={classes.Person} /*style={style}*/>
// 			<p onClick={props.click}>Im {props.name} and I am {props.age} years old!</p>
// 			<p>{props.children}</p>
// 			<input type="text" onChange={props.changed} value={props.name}/>
// 		</div>
// 		)
// }


class Person extends Component {
  constructor(props) {
    super(props)
    console.log('[Person.js] Inside Constructor')
    this.state = {'rasenshuriken': 'weeb'};
    this.inputElementRef = React.createRef();
  }

  // discouraged to use - see NEW in person.js
  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount()')
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount()');
    if (this.props.position === 0) this.inputElementRef.current.focus();
  }

  focus() {
    this.inputElementRef.current.focus();
  }

  // discouraged to use - see NEW in person.js
  // componentWillReceiveProps(nextProps) {
  //   console.log('[UPDATE Person.js] Inside componentWillReceiveProps() ', nextProps)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Person.js] Inside shouldComponentUpdate() ', nextProps, nextState)
  //   return true;
  // }

  // reference is a special property (like key)
  // reference can only be accessed in stateful components
  // you can also use them on your own components
  // dont use them for styling (thats not the react way), it is really for controlling focus or media playback
  render() {
    console.log('[Person.js] Inside render()')   
		return (
			//<WithClass classes={classes.Person} /*style={style}*/>
      <Aux>
        <AuthContext.Consumer>
          {auth => auth ? <p>im authenticated!</p> : null}
				</AuthContext.Consumer>
        <p onClick={this.props.click}>Im {this.props.name} and I am {this.props.age} years old!</p>
				<p>{this.props.children}</p>
				<input 
          ref={this.inputElementRef}
          type="text" 
          onChange={this.props.changed} 
          value={this.props.name}/>
      </Aux>
			//</WithClass>
		)

	// notice below how React16 allows you to return ARRAYS of JSX elements
  // ...howeverr reach array item needs to have a key#
		// return [
		// 		<p key="dfs" onClick={this.props.click}>Im {this.props.name} and I am {this.props.age} years old!</p>,
		// 		<p key="hfg">{this.props.children}</p>,
		// 		<input key="yty" type="text" onChange={this.props.changed} value={this.props.name}/>
		// ]
	}
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
}
// export default Radium(person);
// export default Person;
export default withClass2(Person, classes.Person)