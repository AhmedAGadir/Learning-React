import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// npm install --save redux
import { createStore } from 'redux';
import reducer from './store/reducer';
// to connect react to redux install:
// npm install --save react-redux
// provider allows us to inject our store into our app
import { Provider } from 'react-redux'

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
