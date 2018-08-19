import React from 'react';
import classes from './Cockpit.css';
import Aux from '../../HOC/hoc.js'

const cockpit = props => {

	let assignedClasses = [];
	let btnClass = classes.Button;

    if (props.showPersons) btnClass = [classes.Button, classes.Red].join(' ');
    
    if (props.persons.length <= 2) assignedClasses.push(classes.red) //classes.push('red');
    if (props.persons.length <= 1) assignedClasses.push(classes.bold) //classes.push('bold');

    // we can return the elements wrapped in a div
    // or we could return an array
    // or we could return a higher order componenet - this ones really useful if you dont want to have a wrapping element over your JSX (for styling reasons etc. -- a wrapping div can get in the way of flexbox for example)
	return (
		<Aux>
			<h1>{props.title}</h1>
			<p className={assignedClasses.join(' ')}>This is really working!</p>
			<button
			// style={style} 
			className={btnClass}
			onClick={props.clicked}>Switch Name</button>
	    </Aux>
 	)
}    

export default cockpit;