import React, { Component } from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        // submitted: false
    }

    componentDidMount = () => {
        console.log('[NewPost.js] props are: ', this.props)
        // if the user is unautenticated, you could use something like
        // this.props.history.replace('/')
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        }
        axios.post('https://jsonplaceholder.typicode.com/posts', data)
            .then(response => {
                console.log(response);
                // this pushes a new page (the home page in this case) onto the page stack, taking us back to the home page
                // can also use replace (small difference to do with the page stack)
                this.props.history.push('/')
                // this.setState({submitted: true})
            });
    }

    render () {
        // one way of redirecting
        // let redirect = null;
        // if (this.state.submitted) {
        //     redirect = <Redirect to='/' />
        // }
        return (
            <div className="NewPost">
                {/*{redirect}*/}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;