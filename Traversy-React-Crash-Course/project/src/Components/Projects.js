import React, { Component } from 'react';
import ProjectItem from './ProjectItem'

class Projects extends Component {
  render() {
  	console.log(this.props);
  	let projectItems = (this.props.projects) ? this.props.projects.map(project => <ProjectItem project={project} key={project.title} />) : null;
  	console.log(projectItems)
    return (
      <div className="Projects">
        {projectItems}
      </div>
    );
  }
}

export default Projects;
