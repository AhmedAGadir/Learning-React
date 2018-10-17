import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};

const addIngredient = (prevState, action) => {
	return {
		...prevState,
		ingredients: {
			...prevState.ingredients,
			[action.ingredientName]: prevState.ingredients[action.ingredientName] + 1
		},
		totalPrice: prevState.totalPrice + INGREDIENT_PRICES[action.ingredientName] 
	}
}

const removeIngredient = (prevState, action) => {
	return {
		...prevState,
		ingredients: {
			...prevState.ingredients,
			[action.ingredientName]: prevState.ingredients[action.ingredientName] - 1
		},
		totalPrice: prevState.totalPrice - INGREDIENT_PRICES[action.ingredientName] 
	}
}

const setIngredients = (prevState, action) => {
	return {
		...prevState,
		// we can set the ingredients simply like this:
		// ingredients: action.ingredients,
		// however if we wanted to order the ingredients so that they render on the screen in a particular order, do the following:
		ingredients: {
			salad: action.ingredients.salad,
			bacon: action.ingredients.bacon,
			cheese: action.ingredients.cheese,
			meat: action.ingredients.meat
		},
		totalPrice: 4,
		// we set error to false in case we had a previous error
		error: false,
	}
}

const fetchIngredientsFailed = (prevState, action) => {
	return {
		...prevState,
		error: true
	}
}

// outsourcing the return statements in the switch statement into their own functions makes for cleaner and leaner code
const reducer = (prevState = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT: return addIngredient(prevState, action);
		case actionTypes.REMOVE_INGREDIENT: return removeIngredient(prevState, action)
		case actionTypes.SET_INGREDIENTS: return setIngredients(prevState, action)
		case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(prevState, action)
		default: return prevState
	}
}

export default reducer