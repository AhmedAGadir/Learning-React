const initialState = {
	results: []
}

const reducer = (prevState = initialState, action) => {
	switch ( action.type ) {
		case 'STORE_RESULT':
			return {
				...prevState,
				// since weve split our applications state, this reducer doesnt have access to state.counter,
				// so instead weve passed the counter data in the action parameter
				// results: prevState.results.concat({id: new Date(), value: prevState.counter})
				results: prevState.results.concat({id: new Date(), value: action.result})
			}
		case 'DELETE_RESULT':
			const updatedArray = prevState.results.filter(result => result.id !== action.resultId)
			return {
				...prevState,
				results: updatedArray
			}
		default: 
			return prevState
	}
}


export default reducer;