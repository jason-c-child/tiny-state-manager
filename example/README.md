
This example is implemented in [App.js](https://github.com/jason-c-child/tiny-state-manager/blob/master/example/src/App.js) and 
[actions.js](https://github.com/jason-c-child/tiny-state-manager/blob/master/example/src/actions.js) and not a particularly great example of
 project architecture and abstraction...but it gets the point across.
 
 One thing to keep on mind when using this method is that async events that can overwrite state will in fact do so :p
 
 In my use-cases I tend to just be fetching data from some backend, typically in response to a user action (button click). I'll tend to
 lock the UI components that could trigger async events while the action is pending, roughly equivalent to something like this
 
 ```javascript
 // ...in my state add a 'fetching' flag...
const initState = {
    userData: {},
    fetching: false
}

// ...in my UI component...
<button disabled={props.fetching} onClick={() => {
    emitter.emit('update', {fetching: true})
    emitter.emit('action', {type: 'fetchUser'})
}}>
    Fetch User Data
</button>

// ...in my action listener...
StateManager.emitter.on('action', async function(x) {
    try {
      switch(x.type) {
              case 'fetchUser':
                  const res = await fetch('http://cool.api.io')
                  .then(x => x.json())
                  .then(x => this.emit('update', {userData: x, fetching: false}))       
              break
          }
    } catch (e) {
      console.log('err--->',e.stack)
    }
    
})
```

The example has been updated to include an example using async/await and issuing discrete updates to the state; setting the
`fetching` flag to `true` then calling one of our 'action' functions (which return a promise...so we can await on it)...then
again after to set it `false`. Yay modern js ;)


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
 
 
 
