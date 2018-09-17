// when users click on HTML link tags the page reloads
// this causes our javascript to reload and any state in our app is lost (this is rarely what we want in single page apps)
// so instead we use the Link component provided by React
import React, { Component } from 'react';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import './Blog.css';

import { Route, Link } from 'react-router-dom'
// when you introduce routing into your app, you typically turn all components into containers
// as those containers will normally have their own subcomponents which they distribute their state to.



// componentDidMount and componentDidUpdate are important when causing side effects

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/new-post">New Post</Link></li>
                            {/*another way of using the Link component: 
                            <li><Link to={{
                                pathname: "/new-post",
                                hash: '#submit',
                                search: '?quick-submit=true'}}>New Post</Link></li>*/}
                        </ul>
                    </nav>
                </header>
                {/* if the current path is prefixed with the path property then the jsx in the render prop is rendered,
                to set it so that the jsx in the render prop is only rendered when your exactly on the path property, set exact to true (Default is false)*/}
                {/*<Route path="/" exact={true} render={() => <h1>yo</h1>}/> */}
                
                {/*if you want to render a component, you can use the component prop*/}
                <Route path="/" exact={true} component={Posts} />
                <Route path="/new-post" component={NewPost} />

            </div>
        );
    }
}

export default Blog;