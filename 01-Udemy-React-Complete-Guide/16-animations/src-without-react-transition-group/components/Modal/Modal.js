import React from 'react';

import './Modal.css';

const modal = (props) => {

	const classes = ['Modal', props.show ? 'Open' : 'Close']

	return (
    	<div className={classes.join(' ')}>
        	<h1>A Modal</h1>
        	<button onClick={props.closed} className="Button">Dismiss</button>
    	</div>
	);
}

export default modal;