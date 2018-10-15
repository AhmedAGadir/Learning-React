// in this file i'll use action types just to demonstrate how their used.
import * as actionTypes from './actionTypes';

// ========== ACTION CREATORS ========== 

// we can use action creators with synchronous programming like this:
// see [counter.js] for how its used
// the advantage of doing so is clean code... however for synchronous code its a little overkill
// note: if your application has asynchronous code and your using action creators to dispatch asynchronous actions, 
// then its better to also change your synchronous actions to action creators so that your app has more consistency throughout

// the convention is to name the action-creator whatever the action-type is, but with lowerCamelCase
export const increment = () => {
	return {
		type: actionTypes.INCREMENT
	}
};

export const decrement = () => {
	return {
		type: actionTypes.DECREMENT
	}
};

export const add = amount => {
	return {
		type: actionTypes.ADD,
		amount: amount,
	}
};

export const subtract = amount => {
	return {
		type: actionTypes.SUBTRACT,
		amount: amount
	}
};