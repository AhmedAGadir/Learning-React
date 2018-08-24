import React, { Component } from 'react';
import './App.css';
import Projects from './Components/Projects.js';
import AddProject from './Components/AddProject.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
    }
  }

  componentWillMount() {
    this.setState({
      projects: [
        {
          title: 'Business website',
          category: 'web design'
        },
        {
          title: 'Social App',
          category: 'mobile development',
        },
        {
          title: 'Ecommerce shopping cart',
          category: 'web development'
        }
      ]
    })
  }


  render() {
    return (
      <div className="App">
        <AddProject />
        <Projects projects={this.state.projects}/>
      </div>
    );
  }
}

export default App;
