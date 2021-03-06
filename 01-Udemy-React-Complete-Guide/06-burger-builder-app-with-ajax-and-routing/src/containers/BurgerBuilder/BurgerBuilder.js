import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false,
	}

	componentDidMount = () => {
		console.log(this.props)
		axios.get('/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				console.log(error)
				this.setState({error: true})
			})
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
		// this allows us to push a new page onto a stack on pages
		// this.props.history.push('/checkout')
		// since were adding query parameters we should use the object form
		const queryParams = [];
		for (let ing in this.state.ingredients) {
			queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]))
		}
		queryParams.push('price=' + this.state.totalPrice)
		const queryString = queryParams.join('&');
		console.log('queryString is:', queryString)

		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString,
		})
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0 
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

		if (this.state.ingredients) {
			orderSummary = <OrderSummary 
						ingredients={this.state.ingredients}
						price={this.state.totalPrice}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}/>

			burger = [<Burger ingredients={this.state.ingredients} key='0'/>,
					<BuildControls 
						key='1'
						price={this.state.totalPrice}
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						ordered={this.purchaseHandler} />]
		}

		if (this.state.loading) {
			orderSummary = <Spinner />
		}

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

export default withErrorHandler(BurgerBuilder, axios)