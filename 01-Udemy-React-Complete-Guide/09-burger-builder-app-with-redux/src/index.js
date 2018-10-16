import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
// npm install --save redux react-redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order';
// npm install --save redux-thunk
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer
})


// if were not using any middleware, we can include devtools like this:
// the second argument allows us to use redux devtools on chrome
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// however if we are using middleware (like redux-thunk) then well use this setup:
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
// see https://github.com/zalmoxisus/redux-devtools-extension for more


const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
