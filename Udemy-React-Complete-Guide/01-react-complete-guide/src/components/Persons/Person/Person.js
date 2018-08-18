import React, { Component } from 'react';
import classes from './Person.css';
// import Radium from 'radium';

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
    this.state = {'rasenshuriken': 'weeb'}
  }

  componentWillMount() {
    console.log('[Person.js] Inside componentWillMount()')
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount()')    
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('[UPDATE Person.js] Inside componentWillReceiveProps() ', nextProps)
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Person.js] Inside shouldComponentUpdate() ', nextProps, nextState)
  //   return true;
  // }

  render() {
    console.log('[Person.js] Inside render()')   
		return (
			<div className={classes.Person} /*style={style}*/>
				<p onClick={this.props.click}>Im {this.props.name} and I am {this.props.age} years old!</p>
				<p>{this.props.children}</p>
				<input type="text" onChange={this.props.changed} value={this.props.name}/>
			</div>
		)
	}
}


// export default Radium(person);
export default Person;