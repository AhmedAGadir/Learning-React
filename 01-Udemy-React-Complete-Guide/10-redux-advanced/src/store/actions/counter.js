// ========== ACTION CREATORS ========== 

// we can use action creators without asynchronous programming like this:
export const increment = () => {
	return {
		// could have used the variable version i.e. type: INCREMENT
		type: 'INCREMENT'
	}
};
// see [counter.js] for how its used

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