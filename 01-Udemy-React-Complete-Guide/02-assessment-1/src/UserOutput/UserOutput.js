import React from 'react';
import './userOutput.css'

const userOutput = props => {
	return (
		<div style={props.style}>
			<p onClick={props.ondblclickk}>Legendary Ninja: {props.username}</p>
			<p>{props.description}</p> 
		</div>

	)
}

export default userOutput;