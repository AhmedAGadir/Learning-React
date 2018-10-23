import React, { Component } from 'react';
// can be used in places where you output lists
import TransitionGroup from 'react-transition-group/TransitionGroup';
// has to work with CSSTransition
import CSSTransition from 'react-transition-group/CSSTransition'
import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    }

    render () {
        const listItems = this.state.items.map( (item, index) => (
            <CSSTransition 
                // the in property is managed by TransitionGroup
                key={index}
                timeout={1000}
                classNames="fade">
                <li 
                    className="ListItem" 
                    onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ) );

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                <TransitionGroup component="ul" className="list">
                    {listItems}
                </TransitionGroup>
            </div>
        );
    }
}

export default List;