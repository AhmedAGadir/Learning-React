import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
// import { Link } from 'react-router-dom';
import './Posts.css';

class Posts extends Component {
	state = {
        posts: [],
    }

    componentDidMount() {
        console.log('[POSTS.JS] props are: ', this.props)
        
        axios.get('https://jsonplaceholder.typicode.com/posts')
           .then(response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts})
            })
           .catch(err => {
                console.log(err)
               // this.setState({error: true})
           })
    }

    postSelected = id => {
        // this.setState({selectedPostId: id})
        // .push allows you to push a new page onto the stack of pages
        // .replace replaces the current page on the page stack
        // this.props.history.push({pathname: '/' + id})
        this.props.history.push('/' + id);
    }

	render() {
		let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                // <Link to={'/' + post.id}>
                    <Post 
                        key={post.id}
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelected(post.id)}/>
               // </Link>
            ));
        }

		return (
			<section className="Posts">
                    {posts}
                </section>
        )
	}
}

export default Posts