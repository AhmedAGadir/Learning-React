import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
	}

	addIngredientHandler = type => {
		const prevCount = this.state.ingredients[type];
		const updatedCount = prevCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = type => {
		const prevCount = this.state.ingredients[type];
		if (prevCount <= 0) {
			return;
		}
		const updatedCount = prevCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice});
		this.updatePurchaseState(updatedIngredients);
	}

	updatePurchaseState = ingredients => {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((a, b) => {
				return a + b
			}, 0);
		this.setState({purchasable: sum > 0})
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		alert('Continued...')
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 
		}

		return (
			<Fragment>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary 
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}/>
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					price={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler} />
			</Fragment>
		);
	}
}

export default BurgerBuilder