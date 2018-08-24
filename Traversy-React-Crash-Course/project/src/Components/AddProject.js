import React, { Component } from 'react';

class AddProject extends Component {

	// newer syntax
	state = {
		newProject: {},
	}

	static defaultProps = {
		categories: ['web design', 'mobile development', 'web development']
	}

	// you can access elements and components in your code by passing them refernces and then using this.refs.whateverYouNamedTheReference

	handleSubmit(e) {
		e.preventDefault();
		if (this.refs.title.value == '') {
			alert('title is required');
		} else {

		}
	}

	render() {
		let categoryOptions = this.props.categories.map(category => <option key={category} value="category">{category}</option>);

	return (
	  <div>
	    <h3>Add Project</h3>
	    <form onSubmit={this.handleSubmit.bind(this)}>
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
			<input type="submit" value="submit"/>
	    </form>
	  </div>
	);
	}
}

export default AddProject;
