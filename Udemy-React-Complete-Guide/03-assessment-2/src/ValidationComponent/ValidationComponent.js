import React from 'react';

const validationComponent = (props) => {
	return (props.len < 5) ? <p>text too short</p> : (props.len > 11) ? <p>text too long</p>: null
}


export default validationComponent