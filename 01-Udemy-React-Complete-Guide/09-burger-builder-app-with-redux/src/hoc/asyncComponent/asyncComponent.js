// LAZY LOADING
// useful for large modules
// only loads code when its needed
// dont really understand how the code works

import React, { Component } from 'react';

const asyncComponent = importComponent => {
	return class extends Component {
		state = {
			component = null
		}

		componentDidMount() {
			importComponent()
				.then(cmp => {
					this.setState({ component: cmp.default });
				});
		};

		render() {
			const C = this.state.component;

			return C ? <C {...this.props} /> : null;
		}
	}
}

export default asyncComponent


// the way its used:
// in file:

// import asyncComponent from '...'

// const asyncCheckout = asyncComponent(() => {
// 	return import('./containers/Checkout/Checkout')
// })

// then just use asyncCheckout instead of Checkout 