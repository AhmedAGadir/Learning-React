import React, { Component } from 'react';
// https://stackoverflow.com/questions/42862253/how-to-parse-query-string-in-react-router-v4
//npm install stringquery --save
import querySearch from 'stringquery';

class Course extends Component {
    render () {
    	console.log('[COURSE] props are: ', this.props);
    	let title = querySearch(this.props.location.search).title;

    	// javascript has a built in version. could have used:
    	// let title;
    	// let query = new URLSearchParams(this.props.location.search);
    	// for (let param of query.entries()) {
    	// 	console.log(param)
    	// 	title = param[1]
    	// }

        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;