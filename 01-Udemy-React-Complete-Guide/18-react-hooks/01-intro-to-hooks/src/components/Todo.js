import React, { useState } from 'react';


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
    // you must use 'useState' at the top level of your functional component

    // note: you could manage both of these states in one 'useState' call but its recommended to manage them separately (as its cleaner)
    // initial state is an empty string
    const [userInput, setUserInput] = useState('');
    // initial state is an empty array
    const [toDoList, setToDoList] = useState([]);

    const inputChangeHandler = event => {
        setUserInput(event.target.value);
    }
    const buttonHandler = () => {
        setToDoList([...toDoList, userInput]);
        setUserInput('');
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

//     const [toDoState, setToDoState] = useState({
//         userInput: '',
//         toDoList: []
//     })

//     const inputChangeHandler = event => {
//         // the state passed is NOT merged with the current state, it completely replaces the state,
//         // for this reason, it's definitely better to separate out the state into multiple 'useState' calls
//         setToDoState({
//             userInput: event.target.value,
//             toDoList: toDoState.toDoList
//         })
//     }
//     const buttonHandler = () => {
//         setToDoState({
//             userInput: toDoState.userInput,
//             toDoList: [...toDoState.toDoList, toDoState.userInput]
//         });
//     }

//     return (
//         <React.Fragment>
//             <input type="text" placeholder="Todo" value={toDoState.userInput} onChange={inputChangeHandler} />
//             <button type="button" onClick={buttonHandler}>Add</button>
//             <ul>
//                 {toDoState.toDoList.map(todo => <li key={todo}>{todo}</li>)}
//             </ul>
//         </React.Fragment>
//     )
// }

// export default todo;