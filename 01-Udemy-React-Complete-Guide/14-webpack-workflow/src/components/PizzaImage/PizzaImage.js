import React from 'react';
import classes from './PizzaImage.css';
// our workflow setup allows us to use this import syntax for images
import PizzaImage from '../../assets/pizza.jpg';

const pizzaImage = props => (
	<div className={classes.PizzaImage}>
		<img src={PizzaImage} className={PizzaImg} />
	</div>
)