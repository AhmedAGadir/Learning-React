import React from 'react';
import './userInput.css'

const userInput = props => {
	return <input type="text" onChange={props.change}/>
}

export default userInput;