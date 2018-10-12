import React, { Component } from 'react';
// to connect our state to the store we use the function which returns a hoc - Connect
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
// *** ==== [NOT USING] import * as actionTypes from './actions';

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
                {/* instead of clicked={() => this.counterChangedHandler( 'inc' )}, we use this.props.onIncrementCounter */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
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

        // if were using one reducer it'll be like this:
        // ctr: state.counter,
        // storedResults: state.results

        // since were using multiple reducers, redux will give one layer of nesting (to avoid naming conflicts)
        // see index.js to see where .ctr and .res come from
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
}

// here we say which type of actions do we want to dispatch in this container
// instead of using setState, we now use this.props.foobar
const mapDispatchToProps = dispatch => {
    // this calls dispatch on the store behind the scenes
    return {
        // *** ==== could use dispatch({actionTypes.INCREMENT}) etc.
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', amount: 5}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', amount: 5}),
        // if were using one reducer, we dont need to pass the counter as its part of the applications state
        // HOWEVER, weve split our reducer into multiple reducers, and the reducer that handles onStoreResult and onDeleteResult 
        // doesnt have access to state.counter, well need to pass the counter data here
        onStoreResult: result => dispatch({type: 'STORE_RESULT', result: result}),
        onDeleteResult: id => dispatch({type: 'DELETE_RESULT', resultId: id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);