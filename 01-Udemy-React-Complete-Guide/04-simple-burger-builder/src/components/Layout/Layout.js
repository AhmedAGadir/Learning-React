import React from 'react';
// using css modules: you can name the css import whatever you want
// it basically just gives an object which you name and then assign CSS classes with
// the advantage is that your css classes are scoped
// use an array.join(' ') if you want to add more than one class e.g. className={[classes.foo, class.foobar].join(' ')}
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {

	state = {
		showSideDrawer: false,

	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return {showSideDrawer: !prevState.showSideDrawer};
		});
	}

	render() {
		return (
			<React.Fragment>
				{/* this is a nice way of drafting things up*/}
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
				<SideDrawer 
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}/>
				<div>SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</React.Fragment>
		)
	}
}

export default Layout