import * as actionTypes from '../actions/actionTypes';

const initalState = {
	orders: [],
	loading: false,
	purchased: false
}

const purchaseBurgerStart = (prevState, action) => {
	return {
		...prevState,
		loading: true
	}
}

const purchaseBurgerSuccess = (prevState, action) => {
	const newOrder = {
		...action.orderData,
		id: action.orderId
	}
	return {
		...prevState,
		// stop loading
		loading: false,
		// redirect to home page
		purchased: true,
		orders: prevState.orders.concat(newOrder)
	}	
}

const purchaseBurgerFail = (prevState, action) => {
	return {
		...prevState,
		loading: false,
		// the error will be handled by withErrorHandler in ContactData.js
	}
}

const purchaseBurgerInit = (prevState, action) => {
	return {
		...prevState,
		purchased: false,
	}
}

const fetchOrdersStart = (prevState, action) => {
	return {
		...prevState,
		loading: true
	}
}

const fetchOrdersSuccess = (prevState, action) => {
	return {
		...prevState,
		orders: action.orders,
		loading: false
	}
}

const fetchOrdersFail = (prevState, action) => {
	return {
		...prevState,
		// we wont use the error
		loading: false
	}
}

// outsourcing the return statements in the switch statement into their own functions makes for cleaner and leaner code
const reducer = (prevState = initalState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(prevState, action)
		case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(prevState, action)
		case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(prevState, action)
		case actionTypes.PURCHASE_INIT: return purchaseBurgerInit(prevState, action)
		case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(prevState, action)
		case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(prevState, action)
		case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(prevState, action)
		default: return prevState;
	}
}

export default reducer;