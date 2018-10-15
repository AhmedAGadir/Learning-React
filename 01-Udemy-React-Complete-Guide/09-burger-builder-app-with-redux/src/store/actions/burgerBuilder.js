import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ingName => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: ingName
	}
}

export const removeIngredient = ingName => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredientName: ingName
	}
}

// =============

// dont need to export this as its only ever used in initIngredients 
const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}

// dont need to export this as its only ever used in initIngredients
const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	}
}


// asynchronous syntax available due to redux-thunk
export const initIngredients = () => {
	return dispatch => {
		axios.get('/ingredients.json')
			.then(response => {
				dispatch(setIngredients(response.data))
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed())
			})
	}
}