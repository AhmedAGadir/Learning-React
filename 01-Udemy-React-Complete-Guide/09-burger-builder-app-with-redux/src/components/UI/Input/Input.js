import React from 'react';
import classes from './Input.css';

const input = props => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case ('input'):
			// inputElement = <input className={classes.InputElement} {...props} />
			inputElement = <input className={inputClasses.join(' ')} onChange={props.changed} value={props.value} {...props.elementConfig} />
			break;
		case ('textarea'):
			inputElement = <textarea className={inputClasses.join(' ')} onChange={props.changed} value={props.value} {...props.elementConfig} />
			break;
		case ('select'): 
			inputElement = (
				<select className={inputClasses.join(' ')} onChange={props.changed} value={props.value}>
					{props.elementConfig.options.map(option => (
						<option value={option.value} key={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			)
			break;
		// can add dropdown, select etc.
		default: 
			inputElement = <input className={inputClasses.join(' ')} onChange={props.changed} value={props.value} {...props.elementConfig} />
	} 
	return (
		<div>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	)
}

// We're not showing any error messages in our form, but you can of course easily add some.

// The form inputs (<Input />  component) already receives the information whether it's invalid or not. You could of course easily add some conditionally rendered element inside of that component.

// For example (inside <Input />  component function):

// // all the other code from the videos
 
// let validationError = null;
// if (props.invalid && props.touched) {
//     validationError = <p>Please enter a valid value!</p>;
// }
 
// return (
//      <div className={classes.Input}>
//          <label className={classes.Label}>{props.label}</label>
//          {inputElement}
//          {validationError}
//      </div>
//  );
// This could of course be finetuned. You could also pass the value type (e.g. "email address" ) as a prop:

// validationError = <p>Please enter a valid {props.valueType}</p>; 

// You could also receive the complete error message as a prop:

// validationError = <p>{props.errorMessage}</p>; 

// And of course, also don't forget to style the messages if you want to do that:

// validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;

// In your CSS file, you could have:

// .ValidationError {
//     color: red;
//     margin: 5px 0;
// } 


export default input