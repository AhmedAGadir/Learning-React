import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Users from './containers/Users';
// will now be imported asynchronously: import Pizza from './containers/Pizza';
import asyncComponent from './hoc/asyncComponent';

const AsyncPizza = asyncComponent(() => {
	return import('./containers/Pizza.js');
})

class App extends Component {

	render() {
		return (
			<div>
				<div>
					<Link to="/">Users</Link>
					<Link to="/pizza">Pizza</Link>
				</div>
				<div>
					<Route path="/" exact component={Users} />
					{/* we want the second route to be lazy loaded*/}
					<Route path="/pizza" exact component={AsyncPizza} />
				</div>
			</div>
		)
	}
}

export default App