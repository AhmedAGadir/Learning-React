import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// doesnt need to be exported, only called in this file
const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	}
}

// doesnt need to be exported, only called in this file
const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	}
}
// doesnt need to be exported, only called in this file
const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

// asynchronous action creators available due to redux thunk
export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		// for the loading state (we show a spinner while loading is true)
		// [NOTE] you can use dispatch more than once
		dispatch(purchaseBurgerStart())
		// then attempt to post the data
		// the query param ?auth=token is used on our backend (see database > rules)
		axios.post('/orders.json?auth=' + token, orderData)
			.then(response => {
				// success
				dispatch(purchaseBurgerSuccess(response.data.name, orderData))
			})
			.catch(error => {
				// error
				dispatch(purchaseBurgerFail(error))
			})
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}

// doesnt need to be exported, only called in this file
 const fetchOrdersSuccess = order => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: order
	}
}

// doesnt need to be exported, only called in this file
const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	}
}

// doesnt need to be exported, only called in this file
const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}

export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		// the query param ?auth=token is used on our backend (see database > rules)

		// axios.get('./orders.json?auth=' + token)
		// firebase syntax: '&orderBy="userId"&equalTo="'
		const queryParams = "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('./orders.json' + queryParams)
			.then(res => {
				const fetchedOrders = []
				for (let key in res.data) {
					fetchedOrders.push({
						...res.data[key],
						id: key
					});
				}
				dispatch(fetchOrdersSuccess(fetchedOrders))
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err))
			})
	}
}