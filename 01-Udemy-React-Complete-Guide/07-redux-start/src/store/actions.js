// useful for larger applications
// how to use them:
// instead of hard-coding strings in the counter.js and reducer.js files, we can export these named constants
// and use them. the benefit doing so is that if a typo is made you get a reference error

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
