import React from 'react';
import './Modal.css';

// ======= METHOD A ===========
// const modal = (props) => {

// 	const classes = [
// 		'Modal', 
// 		props.show === 'entering' 
// 		? 'Open' 
// 		: props.show === 'exiting' ? 'Close' : null
// 	]

// 	return (
// 		<Transition
//           in={this.state.showModal}
//           timeout={300}
//           mountOnEnter
//           unmountOnExit>
//     	<div className={classes.join(' ')}>
//         	<h1>A Modal</h1>
//         	<button onClick={props.closed} className="Button">Dismiss</button>
//     	</div>
//     	</Transition>
// 	);
// }


import Transition from 'react-transition-group/Transition'
// METHOD B == THE BETTER WAY TO DO IT

const modal = (props) => (
	<Transition
    	in={props.show}
    	// timeout length should match the animation length
     	timeout={400}
      	mountOnEnter
      	unmountOnExit
      	// some optional functions you can run
      	onEnter={() => console.log('onEnter')}
      	onEntering={() => console.log('onEntering')}
      	onEntered={() => console.log('onEntered')}
      	onExit={() => console.log('onExit')}
      	onExiting={() => console.log('onExiting')}
      	onExited={() => console.log('onExited')}
      	>
      		{state => {

      			const classes = [
					'Modal', 
					state === 'entering' 
					? 'Open' 
					: state === 'exiting' ? 'Close' : null
				]

      			return (
      				<div className={classes.join(' ')}>
		        		<h1>A Modal</h1>
		        		<button onClick={props.closed} className="Button">Dismiss</button>
		    		</div>
      			)
      		}}
	</Transition>
);


// USING CSS transitions COMPONENT === APPARENTLY THE MOST USED ONE -- I DIDNT LIKE IT 
// import CSSTransition from 'react-transition-group/CSSTransition'

// const modal = (props) => (
// 	<CSSTransition
//     	in={props.show}
//      	timeout={400}
//       	mountOnEnter
//       	unmountOnExit
//       	// special property classNames which merges new classes with the child element
//       	classNames="fade-slide"
//       	// CSSTransitions through fade-slide-enter-active-exit-active (See Modal.css)
//       	>
// 		<div className='Modal'>
//     		<h1>A Modal</h1>
//     		<button onClick={props.closed} className="Button">Dismiss</button>
// 		</div>
// 	</CSSTransition>
// );

// theres more (see lectures)

export default modal;