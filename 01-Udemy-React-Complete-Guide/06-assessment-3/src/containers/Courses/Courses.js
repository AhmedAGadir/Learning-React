import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Course from '../Course/Course';
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    // courseClickedHandler = id => {
    //     console.log('[COURSES] props are :', this.props);
    //     this.props.history.push(this.props.match.url + '/' + id)
    // }
    // [in article jsx element] ==> onClick={()=> this.courseClickedHandler(course.id)}

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => (
                                <NavLink key={course.id} to={{
                                    pathname: this.props.match.url + '/' + course.id,
                                    search: '?title=' + course.title,
                                }}>
                                    <article 
                                        className="Course" 
                                        >{course.title}</article>
                                </NavLink>
                            ))
                    }
                </section>
                <Route path='/courses/:id' component={Course}/> 
                {/*another option would be to use path='/courses/:id/:title,
                in this case the pathname on the NavLink would be: this.props.match.url + '/' + course.id + '/' + course.title*/}
            </div>
        );
    }
}

export default Courses;