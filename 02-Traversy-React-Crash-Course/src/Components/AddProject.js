import React, { Component } from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

class AddProject extends Component {

	// newer syntax
	state = {
		newProject: {},
	}

	//useful if no props are being passed
	static defaultProps = {
		categories: ['web design', 'mobile development', 'web development']
	}

	// you can access elements and components in your code by passing them refernces and then using this.refs.whateverYouNamedTheReference
	// this is the easiest way to bind the this operator (<form onSubmit={this.handleSubmit}> )
	// notice => this.setState can also take a second parameter which is a callback function
	handleSubmit = e => {
		e.preventDefault();
		if (this.refs.title.value === '') {
			alert('title is required');
		} else {
			this.setState({
				newProject: {
					// generates random id
					id: uuid.v4(), 
					title: this.refs.title.value,
					category: this.refs.category.value,
				}
			}, () => {
				this.props.addProject(this.state.newProject)
			})
		}
	}

	render() {
		let categoryOptions = this.props.categories.map(category => <option key={category} value={category}>{category}</option>);

	return (
	  <div>
	    <h3>Add Project</h3>
	    <form onSubmit={this.handleSubmit}>
			<div>
				<label>Title</label><br/>
				<input type="text" ref="title" />
			</div>
			<div>
				<label>Category</label><br/>
				<select ref="category">
					{categoryOptions}
				</select>
			</div>
			<br />
			<input type="submit" value="submit"/>
			<br />
	    </form>
	  </div>
	);
	}
}

AddProject.propTypes = {
  categories: PropTypes.array,
  addProject: PropTypes.func
}

export default AddProject;
