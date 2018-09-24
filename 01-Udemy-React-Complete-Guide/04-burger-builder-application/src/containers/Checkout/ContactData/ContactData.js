import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false,
	}

	orderHandler = e => {
		e.preventDefault();
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			// in a real app you would recalculate the price on the server. 
			// if you dont users could potentially manipulate the price before the data gets sent
			price: this.props.price,
			customer: {
				name: 'Ahmed AG',
				address: {
					street: 'bob street',
					postCode: 'W1 2BB',
					country: 'UK'
				},
				email: 'test@bob.com'
			},
			deliveryMethod: 'fastest'
		}
		// the baseURL is in our axios-orders.js file
		// firebase will create a new node 'order'
		// the .json is added (syntax stuff);
		axios.post('/orders.json', order)
			.then(response => {
				console.log(response);
				this.setState({loading: false});
				// go back to the homepage
				this.props.history.push('/')
			})
			.catch(error => {
				console.log(error);
				this.setState({loading: false});
			})
	}

	render() {
		let form = (
			<form>
				<input type="text" name="name" placeholder="your name" />
				<input type="text" name="email" placeholder="your email" />
				<input type="text" name="street" placeholder="street" />
				<input type="text" name="postal" placeholder="postal code" />
				<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData