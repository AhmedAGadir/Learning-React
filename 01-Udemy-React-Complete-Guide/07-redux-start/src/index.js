import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// npm install --save redux
import { createStore, combineReducers } from 'redux';
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

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
