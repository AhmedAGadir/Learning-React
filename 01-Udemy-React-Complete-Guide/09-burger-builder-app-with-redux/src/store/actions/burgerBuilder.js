import * as actionTypes from './actionTypes';

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
export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	}
}


// asynchronous syntax available due to redux-thunk
export const initIngredients = () => {
	return dispatch => {

	}
}