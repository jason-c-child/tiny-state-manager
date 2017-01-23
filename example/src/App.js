import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import appState function
import appState from 'tiny-state-manager';

// import 'actions'...fetching from json api
import {fetchUsers, fetchTodos, appendRandomItem} from './actions'

// create an empty 'seed state'
const initState = {
    count: 0,
    users: [],
    todos: [],
    itemList: []
};

// create the instance
const StateManager = appState(initState)

// create an event handler for these 'actions'...
// each one has the emitter context passed in since
// all state mutation happens within StateManager
StateManager.emitter.on('action', function(x) {
      switch (x.type) {
          case 'fetchUsers':
              fetchUsers(this);
              break
          case 'fetchTodos':
              fetchTodos(this)
              break
          case 'appendRandomItem':
              appendRandomItem(this, x.payload)
              break
          default:
              break
      }
});

class App extends Component {
  constructor (props) {
    super(props);
    // set the StateManager callback to update this component's state
    StateManager.emitter.callback = x => this.setState(x);
    this.state = StateManager.state;
  }
  render() {
    let {count, itemList} = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Counter count={count} />  {/*pass state to our presentation component */}

          <p>
            <button onClick={() => StateManager.emitter.emit('update', {count: count+1})}>
                +
            </button> {/* use the StateManager's emitter to mutate state... */}
            <MinusButton emitter={StateManager.emitter} count={count} /> {/* pass emitter and relevant state to another component */}
          </p>
          <p>
              <button onClick={() => StateManager.emitter.emit('action', {type: 'fetchUsers'})}>
                  fetchUsers
              </button>
              <button onClick={() => StateManager.emitter.emit('action', {type: 'fetchTodos'})}>
                  fetchTodos
              </button>
              <button onClick={() => StateManager.emitter.emit('action', {type: 'appendRandomItem', payload: itemList})}>
                  appendRandomItem
              </button>
              <button onClick={() => StateManager.emitter.emit('reset')}>
                  reset
              </button>
          </p>
          <p>
              There are {this.state.users.length} user records....
          </p>
          <div>
              There are {this.state.itemList.length} items...
              <div>
                  {this.state.itemList.map(x => <div key={x.email}>{JSON.stringify(x)}</div>)}
              </div>
          </div>
          <TodoList todos={this.state.todos}/>
      </div>
    );
  }
}


// a bunch of plain, pure-ish components
const Counter = props =>
  <div>
      Counter clicked {props.count} times!
  </div>

const MinusButton = props =>
    <button onClick={() => props.emitter.emit('update', {count: props.count -1})}>
        -
    </button>

const TodoList = props =>
  <div>
      {props.todos.map(x => <Todo key={x.id} {...x} />)}
  </div>

const Todo = props =>
     <div>
         <h2> TODO </h2>
         {JSON.stringify(props)}
         <br/>
     </div>

export default App;
