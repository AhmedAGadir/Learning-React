import React, { Fragment, Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	componentWillUpdate() {
		console.log('[OrderSummary] WillUpdate')
	}

	render() {
		const ingredientSummary = Object.keys(this.props.ingredients)
			.map(igKey => {
				return (
					<li key={igKey}>
						<span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
					</li>
				)
			});
		
		return (
			<Fragment>
				<h3>Your Order</h3>
				<p>A delicious burder with the following ingredients:</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total Price: £{this.props.price.toFixed(2)}</strong></p>
				<p>Continue to Checkout?</p>
				<Button clicked={this.props.purchaseCancelled} btnType='Danger'>CANCEL</Button>
				<Button clicked={this.props.purchaseContinued} btnType='Success'>CONTINUE</Button>
			</Fragment>
		)
	}
} 

export default OrderSummary;