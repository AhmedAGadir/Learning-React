import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput.js';
import UserOutput from './UserOutput/UserOutput.js';


class App extends Component {

  state = {
    usernames: ['Jirayi the Toad', 'Orochimaru the Snake', 'Tsunade the Slug'],
    description: ['Child of Prophecy', 'Rogue Ninja', 'Master of the 100 Healings Jutsu']
  }

  changeNinja = name => {
    this.setState({
      usernames: ['Uzumaki Naruto', name, 'Haruno Sakura']
    })
  }

  changeDescription = e => {
    this.setState({
      description: ['Child of Prophecy', e.target.value, 'Master of the 100 Healings Jutsu']
    })
  }


  render() {

    const style = [
      {
        backgroundColor: 'orange',
        border: '1px solid blue',
        padding: '8px',
      }, {
        backgroundColor: 'purple',
        border: '1px solid blue',
        padding: '8px',
        color: 'white',
      }, {
        backgroundColor: 'pink',
        border: '1px solid blue',
        padding: '8px',
      }
    ]

    return (
      <div className="App">
        <h1 onDoubleClick={this.changeNinja.bind(this, 'Uchiha Sasuke')}> Assessment 1 </h1>
        <UserInput change={this.changeDescription}/>
        <UserOutput 
          username={this.state.usernames[0]} 
          description={this.state.description[0]}
          style = {style[0]}/>
        <UserOutput 
          username={this.state.usernames[1]} 
          description={this.state.description[1]}
          style = {style[1]}/>
        <UserOutput 
          username={this.state.usernames[2]} 
          description={this.state.description[2]}
          style = {style[2]} 
          ondblclickk={this.changeNinja.bind(this, 'Sasuke-kun')}/>
      </div>
    );
  }
}

export default App;
