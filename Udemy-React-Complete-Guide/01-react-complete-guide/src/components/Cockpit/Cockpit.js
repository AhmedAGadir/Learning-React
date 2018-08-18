import React from 'react';
import classes from './Cockpit.css';

const cockpit = props => {

	let assignedClasses = [];
	let btnClass = '';

    if (props.showPersons) btnClass = classes.Red;
    
    if (props.persons.length <= 2) assignedClasses.push(classes.red) //classes.push('red');
    if (props.persons.length <= 1) assignedClasses.push(classes.bold) //classes.push('bold');


	return (
	 	<div className={classes.Cockpit}>
			<h1>{props.title}</h1>
			<p className={assignedClasses.join(' ')}>This is really working!</p>
			<button
			// style={style} 
			className={btnClass}
			onClick={props.clicked}>Switch Name</button>
	    </div>
 	)
}    

export default cockpit;