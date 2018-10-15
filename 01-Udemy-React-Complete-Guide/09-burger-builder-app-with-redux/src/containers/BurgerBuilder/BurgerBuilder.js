import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		// ingredients and totalPrice are used a lot throughout our application, so well manage then with redux
		// the rest of the state can be managed locally

		// ingredients: null,
		// totalPrice: 4,
		
		// purchasable has been refactored 
		// purchasable: false,
		purchasing: false,
		// loading: false,

		// error is handled in actions/burgerBuilder.js
		// error: false,
	}

	// ========= two ways to run asynchronous code ===============
	// 1) In componentDidMount, instead of using this.setState after recieving the response, you could dispatch an action
	// to update the state (would be done via running this.props.foo in cDM and having the action defined in matchDispatchToProps )
	// 2) Using asynchronous action handlers (with redux-thunk). see actions/burgerBuilder.js

	// well go with number 2
	componentDidMount = () => {
		this.props.onInitIngredients();
	}

	// addIngredientHandler = type => {
	// 	// managed in the reducer now
	// }

	// removeIngredientHandler = type => {
	// 	// managed in the reducer now
	// }

	updatePurchaseState = () => {
		const ingredients = this.props.ings
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((a, b) => {
				return a + b
			}, 0);
		return sum > 0
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		// no longer need to pass ingredients through queryparams, instead can use redux
		this.props.history.push('/checkout')
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.props.ings) {
			orderSummary = <OrderSummary 
						ingredients={this.props.ings}
						price={this.props.price}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}/>

			burger = [<Burger ingredients={this.props.ings} key='0'/>,
					<BuildControls 
						key='1'
						price={this.props.price}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState()}
						ordered={this.purchaseHandler} />]
		}

		// if (this.state.loading) {
		// 	orderSummary = <Spinner />
		// }

		return (
			<Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{/*it makes sense to only re-render order summary when the modal is shown, see Modal.js and OrderSummary.js for how this is done*/}
					{orderSummary}
				</Modal>
				{/*we have to check whether the ingredients have been fetched yet before rendering the burger and the burgerbuilder components
				, otherwise we'll get errors as these components are trying to render before they have the required data*/}
				{burger}
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		error: state.error
	}
}

// ==== without action creators ====
// const mapDispatchToProps = dispatch => {
// 	return {
// 		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
// 		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
// 	}	
// }

// ==== with action creators ====
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
		onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
	}	
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))






