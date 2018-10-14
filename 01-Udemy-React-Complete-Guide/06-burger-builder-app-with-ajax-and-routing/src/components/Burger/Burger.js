import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import { withRouter } from 'react-router-dom'

const burger = props => {
	// console.log(props)
	let transformedIngredients = Object.keys(props.ingredients)
		.map(igKey => {
			return [...Array(props.ingredients[igKey])].map((_, i) => (
				<BurgerIngredient key={igKey+i} type={igKey} />		
			)) 
		})
		.reduce((a, b) => {
			return [...a,...b];
		}, [])

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>
	}
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	)
}

// if we wanted to access the props given by the Router element then use withRouter
//export default withRouter(burger);
export default burger;