const initialState = {
	counter: 0,
}

const reducer = (prevState = initialState, action) => {
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
		default: 
			return prevState
	}
}

export default reducer;
