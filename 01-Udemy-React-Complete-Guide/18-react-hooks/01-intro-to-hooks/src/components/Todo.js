import React, { useState, useEffect } from 'react';

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
// ************* using separate states (recommended) ****************
// ******************************************************************


const todo = props => {
    // RULES:
    // you must only call hooks ('useState', 'useEffect' etc) at the top level of your functional component at the root level (no nesting, for loops, if statements etc)

    // note: you could manage both of these states in one 'useState' call but its recommended to manage them separately (as its cleaner)
    // initial state is an empty string
    const [userInput, setUserInput] = useState('');
    // initial state is an empty array
    const [toDoList, setToDoList] = useState([]);

    // pass a function that should be executed when the component runs for the first time and after ever render cycle
    // the reason you should do http requests inside useEffect is because it will then be executed at the right time in reacts render cycle - avoiding any unwanted effects
    useEffect(() => {
        fetch('https://react-usestate.firebaseio.com/todos.json')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // this will cause an infinite loop as were updating the state, then useEffect will be called again ...
                setToDoList(data);
            })
            .catch(err => console.log(err));

        // optional 
        // 

        // optional
        // the second argument that useEffect takes is an array of values. useEffect will only then run when any of those values change e.g. [userInput] - similar to componentDidUpdate with an if-check
        // if you want to only run useEffect on mounting then pass an empty array - the array is not bound to a variable, so it will never change, so it will only run once - similar to componentDidMount
        // if you want useEffect to run on every render cycle, then dont pass a second argument
    }, []);

    const inputChangeHandler = event => {
        setUserInput(event.target.value);
    }
    const buttonHandler = () => {
        const updatedList = [...toDoList, userInput];
        setToDoList(updatedList);
        postData(updatedList)
        setUserInput('');
    }

    const postData = data => {
        // remember to add /node.json to the firebase URL
        fetch('https://react-usestate.firebaseio.com/todos.json', {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <input type="text" placeholder="Todo" value={userInput} onChange={inputChangeHandler} />
            <button type="button" onClick={buttonHandler}>Add</button>
            <ul>
                {toDoList.map(todo => <li key={todo}>{todo}</li>)}
            </ul>
        </React.Fragment>
    )
}

export default todo;


// ******************************************************************
// ********************* with destructuring *************************
// ********** using combined states (not recommended) ***************
// ******************************************************************

// const todo = props => {

//     const [myState, setMyState] = useState({
//         userInput: '',
//         toDoList: []
//     })

//     const inputChangeHandler = event => {
//         // the state passed is NOT merged with the current state, it completely replaces the state,
//         // for this reason, it's definitely better to separate out the state into multiple 'useState' calls
//         setMyState({
//             userInput: event.target.value,
//             toDoList: myState.toDoList
//         })
//     }
//     const buttonHandler = () => {
//         setMyState({
//             userInput: myState.userInput,
//             toDoList: [...myState.toDoList, myState.userInput]
//         });
//     }

//     return (
//         <React.Fragment>
//             <input type="text" placeholder="Todo" value={myState.userInput} onChange={inputChangeHandler} />
//             <button type="button" onClick={buttonHandler}>Add</button>
//             <ul>
//                 {myState.toDoList.map(todo => <li key={todo}>{todo}</li>)}
//             </ul>
//         </React.Fragment>
//     )
// }

// export default todo;