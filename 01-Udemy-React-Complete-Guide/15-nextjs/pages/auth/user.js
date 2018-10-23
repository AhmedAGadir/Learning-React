import React from 'react';
import User from '../../components/User';

const userPage = props => (
	<div>
		<h1>The auth/user page of {props.appName}</h1>
		<User age={24} name="Ahmed" />
	</div>
)

userPage.getInitialProps = context => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({appName: 'Super App (the second)'})
		}, 2000)
	});
	return promise
} 

export default userPage;

