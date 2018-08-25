import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

//npm install --save prop-types
import PropTypes from 'prop-types';


class Projects extends Component {
  deleteProject = id => {
    this.props.onDelete(id)
  }

  render() {
  	// console.log(this.props);
    // let projectItems = (this.props.projects) ? this.props.projects.map(project => <ProjectItem project={project} key={project.title} />) : null;

  	let projectItems = null;
    if (this.props.projects) {
      projectItems = this.props.projects.map(project => {
        return (
          <ProjectItem 
            onDelete={this.deleteProject}
            project={project} 
            key={project.title} />
        )
      })
    }
  	// console.log(projectItems)
    return (
      <div className="Projects">
      	<h3>Latest Projects</h3>
        {projectItems}
      </div>
    );
  }
}


// we can use propTypes as a form of validation
// it wont stop wrong types from being used, but will give warning in the console
// good practice to use
Projects.propTypes = {
  projects: PropTypes.array,
  onDelete: PropTypes.func
}

export default Projects;
