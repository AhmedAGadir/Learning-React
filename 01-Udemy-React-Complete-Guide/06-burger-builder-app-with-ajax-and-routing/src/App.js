import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
//npm install --save react-router-dom
import { BrowserRouter, Route } from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
    	<BrowserRouter>
			<div>
				<Layout>
		  			<Route path="/" exact component={BurgerBuilder} />
		  			<Route path="/orders" exact component={Orders} />
		  			<Route path="/checkout" component={Checkout} />
				</Layout>
			</div>
		</BrowserRouter>
    );
  }
}

export default App;
