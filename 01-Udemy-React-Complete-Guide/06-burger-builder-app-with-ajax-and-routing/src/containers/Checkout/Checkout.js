import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: null,
		price: 0,
	}

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {}
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] == 'price') {
				price = param[1];
			} else {
				// ['salad', '1']
				// we can convert it into a number using a + sign
				ingredients[param[0]] = +param[1]
			}
		}
		this.setState({ingredients, price})
	}

	checkoutCancelledHandler = () => {
		// takes us back to the last page
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}


	render() {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}/>
				<Route 
					path={this.props.match.url + '/contact-data'}
					// since were using the render method to do this part, 
					// if we want to pass on that useful object with the url stuff, we need to do it via props
					render={ props => (
						<ContactData 
							ingredients={this.state.ingredients}
							price={this.state.price}
							{...props} />
						)} />
			</div>
		)
	}
}

export default Checkout