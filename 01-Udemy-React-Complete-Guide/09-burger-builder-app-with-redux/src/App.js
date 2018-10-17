import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
//npm install --save react-router-dom
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  render() {
    return (
			<div>
				<Layout>
		  			<Route path="/" exact component={BurgerBuilder} />
		  			<Route path="/orders" exact component={Orders} />
		  			<Route path="/auth" exact component={Auth} />
		  			<Route path="/checkout" component={Checkout} />
				</Layout>
			</div>
    );
  }
}

export default App;
