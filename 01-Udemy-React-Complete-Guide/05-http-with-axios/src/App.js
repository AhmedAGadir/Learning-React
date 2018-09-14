import React, { Component } from 'react';

import Blog from './containers/Blog/Blog';
// npm install axios --save

class App extends Component {
  render() {
    return (
      <div className="App">
        <Blog />
      </div>
    );
  }
}

export default App;
