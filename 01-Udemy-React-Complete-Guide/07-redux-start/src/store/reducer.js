const initialState = {
	counter: 0,
	results: []
}

const reducer = (prevState = initialState, action) => {
	
	// [IMPORTANT] whats returned from the reduce doesnt merge with the old state (like in setState),
	// so you have to make sure you return a copy of the previous state (immutably) and change whatever it is you need to change (the spread operator makes this easier) 

	// dont need to include breaks; since were returning something every time
	switch ( action.type ) {
		case 'INCREMENT':
			return {
				...prevState,
				counter: prevState.counter + 1
			}
		case 'DECREMENT':
			return {
				...prevState,
				counter: prevState.counter - 1
			}
		case 'ADD':
			return {
				...prevState,
				counter: prevState.counter + action.amount
			}
		case 'SUBTRACT':
			return {
				...prevState,
				counter: prevState.counter - action.amount
			}
		case 'STORE_RESULT':
			// ======== COPYING OBJECTS WITH NESTED ARRAYS IMMUTABLY (AND ADDING TO THE ARRAYS) =========
			return {
				...prevState,
				// [USEFUL INFO] can use .concat to create immutable copies of arrays (if you dont want to add to them simply use .concat())
				// can use new Date() to generate id's (number of ms since 1970 or something)
				results: prevState.results.concat({id: new Date(), value: prevState.counter})
			}
		case 'DELETE_RESULT':
		// ======== COPYING OBJECTS WITH NESTED ARRAYS IMMUTABLY (AND REMOVING FROM THE ARRAYS) =========
		// method 1 - copy the array and then manipulate the new array
		// const id = 2;
		// const newArray = [...prevState.results] // shallow copy (nested objects and arrays are still references), but since were removing the object and not manipulating them its ok
		// newArray.splice(id, 1)
		// return { ...prevState, results: newArray}

		// method 2 
		const updatedArray = prevState.results.filter(result => result.id !== action.resultId)
			return {
				...prevState,
				results: updatedArray
			}
		default: 
			return prevState
	}
}

// ============ COPYING ARRAYS IMMUTABLY ===================================================
//MORE NOTES ABOUT SHALLOW/DEEP COPIES IN 04-BURGER-BUILDER/.../CONTACTDATA.JS

// this is WRONG - were not copying state immutably
// const newState = prevState;
// newState.counter += 1;
// return newState;

// the following 2 are both RIGHT, however they DONT create deep clones (any nested objects or arrays will still be references and not copies) 
// see 04-BURGER-BUILDER/.../CONTACTDATA.JS to see how to make deep copies 

// method 1
// const newState = Object.assign({}, prevState);
// newState.counter += 1;
// return newState;

// method 2
// ES6
// const newState = {
// 	...prevState,
// 	counter: state.counter + 1
// }





export default reducer;
