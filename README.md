# tiny-state-manager

Very easy to understand and pretty simple. In the past I found that redux was a lot of boiler plate for a lot of the
simple use cases I had. Concentrating all state mutating actions in one place made sense to me. When I use this I
will typically attach a listener to handle stuff like API requests and what not.

You can find a simple 'counter' example in the aptly named 'example' folder

###

The whole thing is tiny

```javascript
import EventEmitter from 'events'

const appState = seedState => {
  const emitter = new EventEmitter()
  let state = seedState || {}
 
  emitter.on('set', function(payload) {
      state = payload
      this.callback(state)
  })
  
  emitter.on('reset', function() {
      seedState && (state = seedState)
      this.callback(state)
  })
  
  emitter.on('update', function(payload) {
      state = {...state, ...payload}
      this.callback(state)
  })
  
  return {
    emitter,
    state
  }
}

export default appState
```

I typically use this in a top-level 'container' component (most of my react projects are small SPA's)

```javascript
//...other imports...
import React, {Component} from 'react'
import MyUserComponent from './MyUserComponent'
import appState from 'tiny-state-manager'

// setup initial app state as object
const initAppState = {
  loading: false,
  userObject: {},
  moreStuff: []
}

// call appState with initial state object to get state manager
const stateManager = appState(initAppState)

class AppContainer extends Component {
  constructor(props) {
    super(props)
    // set the stateManager's emitter callback so container state gets updates
    stateManager.emitter.callback = x => this.setState(x)
    // load initial container state from the stateManager
    this.state = stateManager.state
  }
  
  render() {
    const {emitter} = stateManager
    const {userObject} = this.state
    // pass the emitter down to any component that needs
    // to communicate a state change request via
    // props.emitter.emit('update', {...newState})
    return (
      <div>
          <MyUserComponent {emitter} {userObject}/> 
      </div>
    )
  }
}
```

Now your more 'presentation' oriented components have the state they need and a 
way to request state mutations

```javascript
import React from 'react'

export default = props =>
  <div>
    <div>
      Howdy, {props.userObject.name ? props.userObject.name : 'stranger'}!
    </div>
    <div>
      Change Name: 
        <input type="text" onChange={x => props.emitter.emit('update', {userObject: {...props.userObject, name: x})}/>
    </div>
  </div>
```

Adding API calls may be like this (but with error handling...)

```javascript
stateManager.emitter.on('action', function(payload) {
    switch(payload.type) {
        case 'login':
            fetch('http://our.api.io/users', {method: 'POST', body: payload.data})
            .then(x => x.json())
            .then(x => this.emit('update', {userData: {x}}))
        break
    }
})
```

and now you can just emit this from wherever you have a handle on the emitter
 
 ```javascript
 import React from 'react'
 
 export default = props =>
   <div>
     <div>
       Howdy, {props.userObject.name ? props.userObject.name : 'stranger'}!
     </div>
     <div>
       Change Name: 
         <input type="text" onChange={x => props.emitter.emit('update', {userObject: {...props.userObject, name: x})}/>
     </div>
     <button type="button" onClick={() => props.emitter.emit('action', {type: 'login', data: {...props.userObject}})}
   </div>

```

Nothing fancy, no middlewares, etc.