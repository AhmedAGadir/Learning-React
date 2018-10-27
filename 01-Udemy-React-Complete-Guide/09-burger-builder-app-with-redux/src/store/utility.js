// not using

export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties
	};
};

// e.g. in reducers/counter.js
// import { updateObject } from '../utility'
// ...
// case 'INCREMENT':
// 	return updateObject(prevState, {counter: prevState.counter + 1})