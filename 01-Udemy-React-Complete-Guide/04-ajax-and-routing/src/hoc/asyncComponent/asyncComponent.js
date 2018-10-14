// code splitting or lazy loading is the practice of only loading content when its needed.
// it can be useful for large applications 
//its important to have a good setup for lazy loading, create-react-app has this

// we called this file asyncComponent because it allows us to load content asynchronously i.e. only when its needed
import React from 'react';

const asyncComponent = (importComponent) => {
	return class extends React.Component {
		state = {
			component: null
		}

		componentDidMount = () => {
			importComponent()
				.then(cmp => {
					this.setState({
						component: cmp.default
					})
				})
		}

		render() {
			const C = this.state.component;

			return C ? <C {...this.props} /> : null 
		}
	}
}

export default asyncComponent;