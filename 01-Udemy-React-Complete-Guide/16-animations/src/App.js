import React, { Component } from "react";
// documentation: https://github.com/reactjs/react-transition-group
// npm install --save react-transition-group
import Transition from 'react-transition-group/Transition'
import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
// other react animation libraries include react-motion, react-move, react-router-transition

class App extends Component {
  state = {
    showModal: false,
    showBlock: false
  }

  openModal = () => {
    this.setState({showModal: true})
  }

  closeModal = () => {
    this.setState({showModal: false})
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button 
          className="Button"
          onClick={() => 
            this.setState(prevState => ({showBlock: !prevState.showBlock}))
          }>Toggle</button>
        <br/>

        {/*Transition gives us 4 states: ENTERING, ENTERED, EXITING, EXITED*/}
        <Transition 
          in={this.state.showBlock} 
          // the timeout property will determine how the entering -> entered and exiting -> exited states 
          // will be held. this should match the length of the animations/transitions
          timeout={1000}
          mountOnEnter
          unmountOnExit>
          {/*inbetween our transition tags we get an function with the state as a parameter 
          that returns some jsx*/}
          {state => (
            <div style={{
              backgroundColor: 'red',
              width: 100,
              height: 100,
              margin: 'auto',
              // the state parameter can be useful
              transition: 'all 1s ease-out',
              opacity: state === 'exiting' ? 0 : 1
            }}/>
          )}
        </Transition>

        {/* ======= METHOD A FOR RENDERING THE MODAL ========
          <Transition
            in={this.state.showModal}
            timeout={300}
            mountOnEnter
            unmountOnExit>
            {state => (
              <Modal show={state} closed={this.closeModal} />
            )}
          </Transition>
        */}

        {/* =====  MEHTHOD B FOR RENDERING THE MODAL ====== 
        better. outsourcing the Transition component so that its part of the modal*/}
        <Modal show={this.state.showModal} closed={this.closeModal} />



        {/*we wont animate the backdrop*/}
        {this.state.showModal ? <Backdrop show/> : null} 
         
        <button onClick={this.openModal} className="Button">Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
