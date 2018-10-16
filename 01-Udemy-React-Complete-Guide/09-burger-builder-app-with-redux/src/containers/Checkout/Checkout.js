import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

	checkoutCancelledHandler = () => {
		// takes us back to the last page
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}


	render() {
		// redirect to home page if no ingredients are loadings
		let summary = <Redirect to="/" />
		if (this.props.ings) {
			summary = (
				<Fragment>
					<CheckoutSummary 
						ingredients={this.props.ings}
						checkoutCancelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}/>
					<Route 
						path={this.props.match.url + '/contact-data'}
						component={ContactData} />	
				</Fragment>
			) 
		}
		
		const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;

		return (
			<div>
				{summary}
				{purchasedRedirect}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	}
}

export default connect(mapStateToProps)(Checkout)