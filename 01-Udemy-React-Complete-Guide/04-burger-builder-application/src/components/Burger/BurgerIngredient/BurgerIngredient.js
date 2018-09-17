import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
// use npm install --save prop-types;
// prop-types can only be used on functions created with the class keyword
// by the way functions created with the class keywords are not neccessarily containers/stateful -- what makes a component stateful/a container is if it has state
import PropTypes from 'prop-types';


class BurgerIngredient extends Component {

	render() {
		let ingredient = null;

		switch (this.props.type) {
			case ('bread-bottom'): 
				ingredient = <div className={classes.BreadBottom}/>;
				break;
			case ('bread-top'): 
				ingredient = (
					<div className={classes.BreadTop}>
						<div className={classes.Seeds1}/>
						<div className={classes.Seeds2}/>
					</div>
				);
				break;
			case ('meat'): 
				ingredient = <div className={classes.Meat}/>;
				break;
			case ('cheese'): 
				ingredient = <div className={classes.Cheese}/>;
				break;
			case ('bacon'): 
				ingredient = <div className={classes.Bacon}/>;
				break;
			case ('salad'): 
				ingredient = <div className={classes.Salad}/>;
				break;
			default:
				ingredient = null;
		}

		return ingredient;

	}
}

//note: propTypes is lowercase here 
BurgerIngredient.propTypes  = {
	// all the properties here refer to properties placed on the BurgerIngredient component when its used in other places
	type: PropTypes.string.isRequired,
}

export default BurgerIngredient;