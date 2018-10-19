import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
//npm install --save react-router-dom
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
  	this.props.onTryAutoSignUp()
  }

  render() {
  	// for unauthenticated users
  	let routes = (
  		<Switch>
			<Route path="/auth" exact component={Auth} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
  	)

  	if (this.props.isAuthenticated) {
  		// for authenticated users
  		routes = (
  			<Switch>
				<Route path="/orders" exact component={Orders} />
			  	<Route path="/checkout" component={Checkout} />
			  	<Route path="/logout" exact component={Logout} />
	  			<Route path="/auth" exact component={Auth} />
				<Route path="/" exact component={BurgerBuilder} />
				{/* code breaks when i use this <Redirect to="/" /> */}
			</Switch>
  		)
  	}

    return (
			<div>
				<Layout>
		  			{routes}
				</Layout>
			</div>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(actions.authCheckState())
	}
}

// connect gets in the way of the BrowserRouter/Route props getting passed down
// so we use withRouter to fix this 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
