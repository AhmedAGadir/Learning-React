import React from 'react';
// using css modules: you can name the css import whatever you want
import classes from './Layout.css';

const layout = props => (
	<React.Fragment>
		<div>Toolbar, SideDrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</React.Fragment>
)

export default layout