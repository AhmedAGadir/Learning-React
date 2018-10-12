//since were using node, well use the node import syntax;

const redux = require('redux');
// dont execute the function yet
const createStore = redux.createStore;

const initialState = {
	counter: 0
}

// ======= REDUCER ========
const rootReducer = (prevState = initialState, action) => {
	
	if (action.type === 'INC_COUNTER') {
		// you dont do prevState.counter++ because this will mutate the original state
		// instead we do the following:
		// here we use the spread operator to copy the previous state, then override the counter property 
		return {
			...prevState,
			counter: prevState.counter + 1
		}
	} 
	if (action.type === 'ADD_COUNTER') {
		return {
			...prevState,
			counter: prevState.counter + action.payload.value
		}
	} 

	return prevState;
};

// ======= STORE =========
// a store needs to be initialized with a reducer
// remember even if we have multiple stores, they will be merged into one
const store = createStore(rootReducer);
console.log(store.getState())
// to execute the code run:
// $ node redux-basics.js

// ======= SUBSCRIPTION ===========
// suscriptions make sure that we dont have to manually call store.getState()
// subscribe takes a function that will be executed whenever the state is updated
store.subscribe(() => {
	console.log('[Subscription]', store.getState())
})

// ======= DISPATCHING ACTION =======
// an object containing a type property is the only required parameter
store.dispatch({type: 'INC_COUNTER'});
// console.log(store.getState())
// you can add on more parameters like this
// store.dispatch({
	// type: 'ADD_COUNTER', 
	// value: '',
	// name: '', 
	// id: '',
	// ...});
// or just put them all in a payload object (you can name it whatever you want)
// store.dispatch({
// 	type: 'ADD_COUNTER', 
// 	payload: {
// 		value: 10, 
// 		name: 'foo', 
// 		id: 12323
// 	}
// });
store.dispatch({type: 'ADD_COUNTER', payload: {value: 10}});
// console.log(store.getState())
