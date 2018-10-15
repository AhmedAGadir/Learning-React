// we can make some utility functions to clean up our reducers and avoid repeating a lot of code

const updateObject = (oldObject, updatedValues) => {
	return {
		...oldObject,
		...updatedValues
	}
}

// e.g. in reducers/counter.js
// import { updateObject } from '../utility'
// ...
// case 'INCREMENT':
// 	return updateObject(prevState, {counter: prevState.counter + 1})