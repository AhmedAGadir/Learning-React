import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// this sets up defaults which are true for all requests
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// you can now shorten the urls in each request by ommitting this part 
// - for example change 'https://jsonplaceholder.typicode.com/posts' to '/posts' (i havent done this)
// theres also more you can do with axios (see videos)

// interceptors are functions which are defined globally, 
// which are executed for every request leaving your app and every response entering into it
// good for some stuff including handling errors globally (see Blog.js for how to handle errors locally (just a simple .catch and some UI rendering will do))

// REQUESTS 
axios.interceptors.request.use(requestConfiguration => {
	console.log(requestConfiguration)
	// always return the request configuration 
	// you can edit the request config too
	return requestConfiguration
}, error => {
	console.log(error)
	// make sure to reject the error so we still can forward it so that it can be handled locally by catch methods etc.
	return Promise.reject(error);
})

// RESPONSES
axios.interceptors.response.use(responseConfiguration => {
	console.log(responseConfiguration)
	// same thing
	return responseConfiguration
}, error => {
	console.log(error)
	// make sure to reject the error so we still can forward it so that it can be handled locally by catch methods etc.
	return Promise.reject(error);
})

// You learned how to add an interceptor, getting rid of one is also easy. Simply store the reference to the interceptor in a variable and call eject  with that reference as an argument, to remove it (more info: https://github.com/axios/axios#interceptors):

// var myInterceptor = axios.interceptors.request.use(function () {/*...*/});
// axios.interceptors.request.eject(myInterceptor);


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
