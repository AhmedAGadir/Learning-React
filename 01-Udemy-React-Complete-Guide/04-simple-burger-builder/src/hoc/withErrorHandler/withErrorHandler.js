import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal'

// the axios instance is used to set up a gloal error handler
const withErrorHandler = (WrappedComponent, axios) => {

	return class extends Component {
		state = {
			error: null
		}

		// we use componentDidMount here because we need to set up the interceptors (to catch errors and stuff) 
		// before the children components are rendered (See lifecycle hooks diagram)
		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: null})
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error})
			});
		}

		componentWillUnmount() {
			console.log('WillUnmount')
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		}

		render() {
			return (
				<React.Fragment>
					<Modal 
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			)
		}
	} 
}

export default withErrorHandler;