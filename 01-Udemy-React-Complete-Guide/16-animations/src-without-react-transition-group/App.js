import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

// THE LIMITATION WITH ANIMATING REACT COMPONENTS IN PURE CSS
// you either have to:
// 1) ALWAYS RENDER COMPONENTS AND USE TRANSITIONS/ANIMATIONS/OPACITY TO ANIMATE THEM IN AND OUT
// the problem with this method is that you have to always render the components, even when you dont want to use them
// 2) RENDER THEM CONDITIONALLY (LIKE NORMAL)
// the problem with this method is that you cant animate the components as theyre unmounting as unmounting happens instantly in react

// you can use setTimeout or some other hacks to get around this
// alternatively you can use the React-Transition-Group library 
// see bookmarks/google for more (there are other options out there)

class App extends Component {
  state = {
    showModal: false
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
        <Modal show={this.state.showModal} closed={this.closeModal} />
        <Backdrop show={this.state.showModal}/>
        {/* if we do it this way, we dont get an out-animation as removing components in react happens instantly
          {this.state.showModal ? <Modal show={this.state.showModal} closed={this.closeModal} /> : null}
          {this.state.showModal ? <Backdrop show={this.state.showModal}/> : null} 
        */}
        <button onClick={this.openModal} className="Button">Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
