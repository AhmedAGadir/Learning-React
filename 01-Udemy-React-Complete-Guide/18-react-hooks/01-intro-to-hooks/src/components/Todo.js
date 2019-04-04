import React, { useState, useEffect, useReducer, useRef } from 'react';

// *****************************************************************
// ******************* without destructuring ************************
// *****************************************************************

// const todo = props => {

//     // // initial state is an empty string
//     // returns an array with 2 elements - (1) current state (2) a function which we can use to replace that state
//     const inputState = useState('');

//     const inputChangeHandler = event => {
//         inputState[1](event.target.value)
//     }

//     return (
//         <React.Fragment>
//             <input type="text" placeholder="Todo" value={inputState[0]} onChange={inputChangeHandler} />
//             <button type="button">Add</button>
//             <ul />
//         </React.Fragment>
//     )
// }


// ******************************************************************
// ********************* with destructuring *************************
// ********** using combined states (not recommended) ***************
// ******************************************************************

// const todo = props => {

//     const [myState, setMyState] = useState({
//         toDoItem: '',
//         toDoList: []
//     })

//     const inputChangeHandler = event => {
//         // the state passed is NOT merged with the current state, it completely replaces the state,
//         // for this reason, it's definitely better to separate out the state into multiple 'useState' calls
//         setMyState({
//             toDoItem: event.target.value,
//             toDoList: myState.toDoList
//         })
//     }
//     const toDoAddHandler = () => {
//         setMyState({
//             toDoItem: myState.toDoItem,
//             toDoList: [...myState.toDoList, myState.toDoItem]
//         });
//     }

//     return (
//         <React.Fragment>
//             <input type="text" placeholder="Todo" value={myState.toDoItem} onChange={inputChangeHandler} />
//             <button type="button" onClick={toDoAddHandler}>Add</button>
//             <ul>
//                 {myState.toDoList.map(todo => <li key={todo}>{todo}</li>)}
//             </ul>
//         </React.Fragment>
//     )
// }

// export default todo;


// ******************************************************************
// ********************* with destructuring *************************
// ************* using separate states (recommended) ****************
// ********************** using useState ****************************
// ******************************************************************

// const todo = props => {
//     // RULES:
//     // you must only call hooks ('useState', 'useEffect' etc) at the top level of your functional component at the root level (no nesting, for loops, if statements etc)

//     // note: you could manage both of these states in one 'useState' call but its recommended to manage them separately (as its cleaner)
//     // initial state is an empty string
//     const [toDoItem, setToDoItem] = useState('');
//     // initial state is an empty array
//     const [toDoList, setToDoList] = useState([]);
//     const [submittedToDo, setSubmittedToDo] = useState(null)

//     // pass a function that should be executed when the component runs for the first time and after ever render cycle
//     // the reason you should do http requests inside useEffect is because it will then be executed at the right time in reacts render cycle - avoiding any unwanted effects
//     useEffect(() => {
//         fetch('https://react-usestate.firebaseio.com/todos.json')
//             .then(res => res.json())
//             .then(data => {
//                 const fetchedToDoList = Object.keys(data).map(key => ({
//                     id: key,
//                     name: data[key].name
//                 }));
//                 // without passing a second paramater to useEffect, this will cause an infinite loop, as calling setToDoList will cause a re-render
//                 setToDoList(fetchedToDoList);
//             })
//             .catch(err => console.log(err));

//         // optional 
//         // for cleanup work pass a return statement with a function- similar to componentDidUnmount
//         // react will execute the function as a cleanup before it calls useEffect again or when the component unmounts
//         // useful for removing event listeners etc
//         return () => {
//             console.log('cleanup');
//         }

//         // optional
//         // the second argument that useEffect takes is an array of values. useEffect will only then run when any of those values change e.g. [toDoItem] - similar to componentDidUpdate with an if-check
//         // if you want to only run useEffect on mounting then pass an empty array - the array is not bound to a variable, so it will never change, so it will only run once - similar to componentDidMount
//         // if you want useEffect to run on every render cycle, then dont pass a second argument
//     }, []);

//     useEffect(() => {
//         if (!submittedToDo) {
//             // we dont want any effect when executing on first render 
//             return
//         }
//         // now this will run each time we change submittedToDo
//         setToDoList(toDoList.concat(submittedToDo));
//     }, [submittedToDo])

//     const inputChangeHandler = event => {
//         setToDoItem(event.target.value);
//     }
//     const toDoAddHandler = () => {
//         // remember to add /node.json to the firebase URL
//         fetch('https://react-usestate.firebaseio.com/todos.json', {
//             method: 'POST',
//             mode: 'cors',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name: toDoItem })
//         })
//             .then(res => res.json())
//             .then(data => {
//                 setTimeout(() => {
//                     // this setTimeout can cause the data to update wrong, if the click handler is invoked twice, then two fetch requests are sent out and 
//                     // return two copies of the array in the database with each item separately e.g. array1: ['foo','bar','baz'] and array2: ['foo','bar','buz'] 
//                     // what we want is ['foo','bar','baz', 'buz']
//                     setSubmittedToDo({ id: data.name, name: toDoItem });
//                 }, 3000);
//             })
//             .catch(err => console.log(err));

//         setToDoItem('');
//     }

//     return (
//         <React.Fragment>
//             <input type="text" placeholder="Todo" value={toDoItem} onChange={inputChangeHandler} />
//             <button type="button" onClick={toDoAddHandler}>Add</button>
//             <ul>
//                 {toDoList.map(todo => <li key={todo.id}>{todo.name}</li>)}
//             </ul>
//         </React.Fragment>
//     )
// }

// export default todo;


// ******************************************************************
// ********************** using useReducer **************************
// ******************************************************************


const todo = props => {
    // now using useReducer
    // const [toDoList, setToDoList] = useState([]);
    // now using useRef
    // const [toDoItem, setToDoItem] = useState('');
    const toDoInputRef = useRef('');

    // helps us manipulate state conveniently
    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'SET':
                return action.payload;
            case 'ADD':
                console.log('adding', state.concat(action.payload))
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    }

    // arguments are reducer, initial state, initial action (optional)
    const [toDoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        fetch('https://react-usestate.firebaseio.com/todos.json')
            .then(res => res.json())
            .then(data => {
                const fetchedToDoList = Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name
                }));
                dispatch({ type: 'SET', payload: fetchedToDoList });
            })
            .catch(err => console.log(err));
    }, []);

    const toDoAddHandler = () => {
        const toDoName = toDoInputRef.current.value;
        fetch('https://react-usestate.firebaseio.com/todos.json', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: toDoName })
        })
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    // useReducer always gives us the latest state, so we dont need that submittedToDo hack
                    dispatch({ type: 'ADD', payload: { id: data.name, name: toDoName } });
                }, 3000);
            })
            .catch(err => console.log(err));

        toDoInputRef.current.value = ''
    }

    const toDoRemoveHandler = toDoId => {
        fetch(`https://react-usestate.firebaseio.com/todos/${toDoId}.json`, {
            method: 'DELETE',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toDoId)
        })
            .then(() => {
                dispatch({ type: 'REMOVE', payload: toDoId });
            })
            .catch(err => console.log(err));

    }

    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" ref={toDoInputRef} />
            <button type="button" onClick={toDoAddHandler}>Add</button>
            <ul>
                {toDoList.map(todo => <li key={todo.id} onClick={toDoRemoveHandler.bind(this, todo.id)}>{todo.name}</li>)}
            </ul>
        </React.Fragment>
    )
}

export default todo;