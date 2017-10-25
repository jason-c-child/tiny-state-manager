import EventEmitter from 'events'

const appState = seedState => {
  const emitter = new EventEmitter()
  let state = seedState || {}

  emitter.getState = function () {
      return {...state}
  }

  emitter.on('set', function(payload) {
      state = {...payload}
      this.callback && this.callback(state)
  })
  
  emitter.on('reset', function() {
      seedState && (state = {...seedState})
      this.callback && this.callback(state)
  })
  
  emitter.on('update', function(payload) {
      state = {...state, ...payload}
      this.callback && this.callback(state)
  })
  
  return {
    emitter,
    state
  }
}

export default appState
