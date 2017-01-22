import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import appState function
import appState from 'tiny-state-manager';

// create an empty 'seed state'
const initState = {
  count: 0
}

// create the instance
const StateManager = appState(initState)

class App extends Component {
  constructor (props) {
    super(props);
    // set the StateManager callback to update this component's state
    StateManager.emitter.callback = x => this.setState(x);
    this.state = StateManager.state;
  }
  render() {
    let {count} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
        <Counter count={count} />  {/*pass state to our presentation component */}
        </p>
          <p>
            <button onClick={() => StateManager.emitter.emit('update', {count: count+1})}>
                +
            </button> {/* use the StateManager's emitter to mutate state... */}
            <MinusButton emitter={StateManager.emitter} count={count} /> {/* pass emitter and relevant state to another component */}
          </p>
      </div>
    );
  }
}

const Counter = props =>
  <div>
      Counter clicked {props.count} times!
  </div>

const MinusButton = props =>
    <button onClick={() => props.emitter.emit('update', {count: props.count -1})}>
        -
    </button>

export default App;
