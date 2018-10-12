import React, { Component } from 'react';
// to connect our state to the store we use the function which returns a hoc - Connect
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                {/* instead of this.state.counter, we use this.props.ctr*/}
                <CounterOutput value={this.props.ctr} />
                {/* instead of clicked={() => this.counterChangedHandler( 'inc' )}, we use this.onIncrementCounter */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={this.props.onStoreResult}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

// you pass in which parts of the state youre interested in and which actions you want to dispatch
// in our component, instead of this.state.counter, well now use this.props.ctr
const mapStateToProps = state => {
    return {
        // here we define prop names
        ctr: state.counter,
        storedResults: state.results
    }
}

// here we say which type of actions do we want to dispatch in this container
// instead of using setState, we now use this.props.foobar
const mapDispatchToProps = dispatch => {
    // this calls dispatch on the store behind the scenes
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', amount: 5}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', amount: 5}),
        // dont need to pass the counter as its part of the applications state
        onStoreResult: () => dispatch({type: 'STORE_RESULT'}),
        onDeleteResult: id => dispatch({type: 'DELETE_RESULT', resultId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);