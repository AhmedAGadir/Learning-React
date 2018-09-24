import React from 'react';
// this allows us access the props that are normally only accessible on the component specified in the route component's component prop
// to other components down their component trees
// can see them by console logging this.props
// import { withRouter } from 'react-router-dom';
import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

// export default withRouter(post);
export default post