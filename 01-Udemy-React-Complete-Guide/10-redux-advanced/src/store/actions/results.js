// ========== ACTION CREATORS ========== 

//  the only way to dispatch asynchronous actions is with action creators (and thunk)

// ========== USING REDUX THUNK =================


const storeResultAction = res => {
	// can add logic to transform data before storing it in the state
	// however, its probably better to do this in the reducer as reducers are meant 
	// to be the place where the state is updated and manipulated, while actions / action creators are meant to pass on data to the reducer 
	return {
		type: 'STORE_RESULT',
		result: res
	}
} 

// asynchronous syntax available due to redux-thunk
export const storeResult = res => {
	// remember middleware runs between the dispatching of an action and the time the action reaches the reducer
	// redux-thunk blocks the dispatched action, and then resends it asynchronously  
	return dispatch => {
		setTimeout(() => {
			// inside the asynchronous code, we dispatch a new action creator with our desired action (and pass on props if we need to)
			// notice how we have 2 action creators now - the first one that gets called in counter.js and that redux-thunk stops, 
			// and the second one that we call after doing our asynchronous business
			dispatch(storeResultAction(res));
		}, 2000)
	}
}

// === extra ===
// thunk also gives an optional second argument 'getState' which allows us to access the state if we wanted to 
// its kind of discouraged to use though as logic should really be done in the reducer
// export const storeResult = res => { 
// 	return (dispatch, getState) => {
// 		setTimeout(() => {		
// 			// if we needed to access the state we could
// 			// const oldCounter = getState().ctr.counter
// 			dispatch(storeResultAction(res));
// 		}, 2000)
// 	}
// }


// =====================================

export const deleteResult = id => {
	return {
		type: 'DELETE_RESULT',
		resultId: id
	}
}