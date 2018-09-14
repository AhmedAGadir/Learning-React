import React, { Fragment } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
	
	// not using purecomponent as it would run more checks than we want, e.g. checking if the clicked prop has changed
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.show !== this.props.show) {
			return true;
		}
		return false
	}

	componentWillUpdate() {
		console.log('[Modal.js] WillUpdate')
	}

	render() {
		return (
			<Fragment>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div 
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}>
					{this.props.children}
				</div>
			</Fragment>
		)
	}
} 

export default Modal