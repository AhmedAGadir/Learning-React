// to avoid typos we can do this
// useful for larger applications
// not using these 
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

// ========== ACTION CREATORS ========== 
// USEFUL FOR MAKING ASYNCHRONOUS ACTIONS

// can recieve a paylod prop
export const increment = () => {
	return {
		// could have used the variable version i.e. type: INCREMENT
		type: 'INCREMENT'
	}
};

export const decrement = () => {
	return {
		type: 'DECREMENT'
	}
};

export const add = amount => {
	return {
		type: 'ADD',
		amount: amount,
	}
};

export const subtract = amount => {
	return {
		type: 'SUBTRACT',
		amount: amount
	}
};

export const storeResult = res => {
	return {
		type: 'STORE_RESULT',
		result: res
	}
}

export const deleteResult = id => {
	return {
		type: 'DELETE_RESULT',
		resultId: id
	}
}