
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
StateManager.emitter.on('action', function(x) {
    switch(x.type) {
        case 'fetchUser':
            fetch('http://cool.api.io')
            .then(x => this.emit('update', {userDate: x, fetching: false}))       
        break
    }
})
```

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
 
 
 