import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// npm install --save redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import reducer from './store/reducer';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';
// to connect react to redux install:
// npm install --save react-redux
// provider allows us to inject our store into our app
import { Provider } from 'react-redux'

// if we only have one reducer
// const store = createStore(reducer);

// if we have multiple reducers
const rootReducer = combineReducers({
	ctr: counterReducer,
	res: resultsReducer
})

// ======== redux middleware structure ==============
// middleware is a term for code that allows us to do something with our actions before they reach the reducer 
// theyre useful for asynchronous code 
const logger = store => {
	// returns a function which takes a parameter 'next'
	return next => {
		// returns another function which recieves an action you dispatch
		return action => {
			console.log('[Middleware] dispatching', action)
			const result = next(action);
			console.log('[Middleware] next state', store.getState())
			return result
		}
	}
}

// you can pass a second argument to createStore called an enhancer (which is just middleware),
// the applyMiddleware function can take a list of middleware and will apply them in order
// const store = createStore(rootReducer, applyMiddleware(logger));

// enabling redux devtools 
// https://github.com/zalmoxisus/redux-devtools-extension
// compose allows us to combine enhancers, we use it as a fallback (in case window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ doesnt work)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

//redux-thunk adds a middleware to our project, which allows our 
// action-creators to return a function which will eventually dispatch an action. 
