// https://www.youtube.com/watch?v=A71aqufiNtQ&t=148s

import React, { Component } from 'react';
import uuid from 'uuid';
import './App.css';
import Projects from './Components/Projects.js';
import AddProject from './Components/AddProject.js';

class App extends Component {
  constructor() {
    super();
    this.state = {projects: []}
  }

  componentWillMount() {
    this.setState({
      projects: [
        {
          // generates random id
          id: uuid.v4(), 
          title: 'Business website',
          category: 'web design'
        },
        {
          id: uuid.v4(),          
          title: 'Social App',
          category: 'mobile development',
        },
        {
          id: uuid.v4(),
          title: 'Ecommerce shopping cart',
          category: 'web development'
        }
      ]
    })
  }

  handleAddProject = project => {
    // the state must remain immutable
    let projects = [...this.state.projects];
    projects.push(project);
    this.setState({projects})
  }

  handleDeleteProject = id => {
     // the state must remain immutable
    let projects = [...this.state.projects];
    let index = projects.findIndex(x => x.id === id)
    projects.splice(index, 1)
    this.setState({projects})
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject}/>
        <Projects 
          projects={this.state.projects}
          onDelete={this.handleDeleteProject}/>
      </div>
    );
  }
}

export default App;
