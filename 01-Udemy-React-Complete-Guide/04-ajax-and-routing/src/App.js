import React, { Component } from 'react';

// the --save command creates an entry in the package.json file, so we can easily share our project

import Blog from './containers/Blog/Blog';
// npm install axios --save

import { BrowserRouter } from 'react-router-dom'
//npm install --save react-router-dom

class App extends Component {
  render() {
  	// by wrapping everything in the BrowserRouter component, weve turned on routing for our app
    // routing can now be used at all levels
    return (
    	<BrowserRouter>
      		<div className="App">
        		<Blog />
      		</div>
      	</BrowserRouter>
    );
  }
}

export default App;
