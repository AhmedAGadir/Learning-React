// useful for larger applications
// how to use them:
// instead of hard-coding strings in the counter.js and reducer.js files, we can export these named constants
// and use them. the benefit doing so is that if a typo is made you get a reference error.

// in the files you want to use them, you write:
// import * as actionTypes from '...'
// and then use them like this e.g. 
// in the counter.js file: dispatch({type: actionTypes.INCREMENT, value: 1}) 
// in the reducer.js file: case actionTypes.INCREMENT: 

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';


// ========== USING REDUX THUNK =================

export const saveResult = res => {
	return {
		type: 'STORE_RESULT',
		result: res
	}
} 


export const storeResult = res => {
	// remember middleware runs between the dispatching of an action and the time the action reaches the reducer
	// redux-thunk blocks the dispatched action, and then resends it asynchronously  
	// (anonymous function)
	return dispatch => {
		setTimeout(() => {
			// inside the asynchronous code, we dispatch an action creator with our desired action 
			dispatch(saveResult(res));
		}, 2000)
	}
}


// =====================================

export const deleteResult = id => {
	return {
		type: 'DELETE_RESULT',
		resultId: id
	}
}