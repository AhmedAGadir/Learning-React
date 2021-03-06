// undefined is always treated as false in comparison operators, however it also never evaluates to true

import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3,
					maxLength: 7
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			postCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3,
					maxLength: 7
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true,
					minLength: 2,
					maxLength: 7
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'mail',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Email'
				},
				value: '',
				validation: {
					required: true,
					minLength: 3,
					maxLength: 15,
					isEmail: true,
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: 'fastest',
				validation: {},
				valid: true,
			}
		},
		formIsValid: false,
		// loading is handled by redux
		// loading: false,
	}

	orderHandler = e => {
		e.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}
		this.props.onOrderBurger(order, this.props.token)
	}

	inputChangedHandler = (e, inputIdentifier) => {
		// to see more on shallow/deep copies see 07-REDUX-START/../REDUCER.JS
		// [IMPORTANT INFO] since an object is nested inside of this.state.orderForm, its not enough to just use the spread operator
		// the reason being that the spread operator will create a shallow copy of this.state.orderForm but not a deep copy
		// a shallow copy will copy all things like strings, numbers etc but not objects/arrays nested inside of the object were copying
		// to create a deep copy we do the following
		const updatedOrderForm = {
			...this.state.orderForm
		}
		// we basically access and copy the property-value pair that contains the object that needs to be deep copied
		const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
		updatedFormElement.touched = true;
		updatedFormElement.value = e.target.value;
		updatedFormElement.valid = this.checkValidaty(updatedFormElement.value, updatedFormElement.validation)
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}

		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
	}

	checkValidaty(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength  && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength  && isValid;
		}

		if (rules.isEmail) {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			isValid = pattern.test(value) && isValid
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/
			isValid = pattern.test(value) && isValid
		}

		return isValid;
	}

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input 
						changed={e => this.inputChangedHandler(e, formElement.id)}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						key={formElement.id} />
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
			</form>
		);
		if (this.props.loading) {
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

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))