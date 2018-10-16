import * as actionTypes from '../actions/actionTypes';

const initalState = {
	orders: [],
	loading: false,
	purchased: false
}

const reducer = (prevState = initalState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_START:
			return {
				...prevState,
				loading: true
			}
		case actionTypes.PURCHASE_BURGER_SUCCESS:
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
		case actionTypes.PURCHASE_BURGER_FAIL:
			return {
				...prevState,
				loading: false,
				// the error will be handled by withErrorHandler in ContactData.js
			}
		case actionTypes.PURCHASE_INIT:
			return {
				...prevState,
				purchased: false,
			}
		case actionTypes.FETCH_ORDERS_START:
			return {
				...prevState,
				loading: true
			}
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return {
				...prevState,
				orders: action.orders,
				loading: false
			}
		case actionTypes.FETCH_ORDERS_FAIL:
			return {
				...prevState,
				// we wont use the error
				loading: false
			}
		default: 
			return prevState;
	}
}

export default reducer;