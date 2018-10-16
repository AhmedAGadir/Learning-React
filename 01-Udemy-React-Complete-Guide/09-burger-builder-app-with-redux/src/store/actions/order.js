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
export const purchaseBurger = orderData => {
	return dispatch => {
		// for the loading state
		// [NOTE] you can use dispatch more than once
		dispatch(purchaseBurgerStart())
		// then attempt to post the data
		axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart())
		axios.get('./orders.json')
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