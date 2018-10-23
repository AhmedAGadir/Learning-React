import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

class IndexPage extends React.Component {
	// special lifecycle hook getInitialProps
	// can also be used in functional components 
	// static means it can be called without the component being instantiated (?)
	// the code is executed on the server 
	// but can be executed on the client if you navigated there within the app (?)
	// the reason its useful is that you could fetch data or do some stuff on the server side before rendering the component

	// with async/await
	// static async getInitialProps(context) {
	// 	console.log(context);
	// 	// could do some asycnrhonous stuff here e.g. fetch requests etc.
	// 	// await ...
	// 	// return an object which will be props
	// 	return {appName: 'Super App'}
	// }
	// without async/await
	static getInitialProps(context) {
		console.log(context);
		const promise = new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({appName: 'Super App'})
			}, 2000)
		});
		return promise
	}

	render() {
		return (
			<div>
				<h1>The main page of {this.props.appName}</h1>
				{/*still need to include the a tag inside the Link component*/}
				<p>Go to <Link href="/auth/user"><a>Auth/User</a></Link></p>
				<button onClick={() => {Router.push('/auth/user')}}>Go to Auth/User</button>
			</div>
		)
	}
}

export default IndexPage;