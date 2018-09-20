// when users click on HTML link tags the page reloads
// this causes our javascript to reload and any state in our app is lost (this is rarely what we want in single page apps)
// so instead we use the Link component provided by React
import React, { Component } from 'react';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost'

import './Blog.css';

// NavLink is used if you want to style the active link
import { Route, Link, NavLink, Switch } from 'react-router-dom'
// when you introduce routing into your app, you typically turn all components into containers
// as those containers will normally have their own subcomponents which they distribute their state to.



// componentDidMount and componentDidUpdate are important when causing side effects

// Relative Paths
// Sometimes, you might want to create a relative path instead. This is especially useful, if your component is already loaded given a specific path (e.g. posts ) and you then want to append something to that existing path (so that you, for example, get /posts/new ).
// If you're on a component loaded via /posts , to="new"  would lead to example.com/new , NOT example.com/posts/new . 
// To change this behavior, you have to find out which path you're on and add the new fragment to that existing path. You can do that with the url  property of props.match :
// see coursenotes for more 

class Blog extends Component {
    state = {
        auth: true,
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/*NavLink is used if you want to style the active links.
                            it gives the active a tag that gets compiled by our setup a class of "active"
                            the exact prop is used so that the link is only given a class of active if the url is exactly matched by the to prop, and not just prefixed by it 
                            if you want to overwrite the name of the class (to something else other than active), you can add a property activeClassName="foo"
                            you also have the option of using inline styles with activeStyle={{JS OBJECT}}*/}
                            <li><NavLink to="/" exact={true}>Home</NavLink></li>
                            <li><Link to="/new-post">New Post</Link></li>
                            {/*another way of using the Link component: 
                            <li><Link to={{
                                // if you want a dynamic path you can do
                                // pathname: this.props.match.url + '/new-post'
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
                {/*you can use the Switch component to only render the first Route that satisfies a given path
                    ofcourse you can have Routes outside of the Switch component*/}
               <Route path="/" exact={true} component={Posts} />
               <Switch>
                    { this.state.auth ? <Route path="/new-post" component={NewPost} /> : null }
                    {/* Dynamic routing
                        This route will always be rendered, however it will also pass on a property (id in this case)
                         to the rendered component (under match -> params) that contains the path */}
                    <Route path="/:id" exact={true} component={FullPost} />
                    {/*== how to handle 404 erros
                    you can define a Route component without a path, which will render something for any unknown component
                    can use either the component prop or render prop (its your choice)
                    this Route should always come last in the list */}
                    <Route render={() => <h1>Not found</h1>} />

                </Switch>
            </div>
        );
    }
}

export default Blog;