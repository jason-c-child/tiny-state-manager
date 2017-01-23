
// functions for fetching stuff from a json rest api
// using the emitter context so state can be updated

// these two examples overwrite the users and todos
// arrays in state...

const fetchUsers = (emitter) =>
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(x => x.json())
    .then(x => emitter.emit('update', {users: x}));

const fetchTodos = (emitter) =>
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(x => x.json())
    .then(x => emitter.emit('update', {todos: x}));

// this function appends to a list

const appendRandomItem = (emitter, itemList) =>
    fetch('https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole')
        .then(x => x.json())
        .then(x => emitter.emit('update', {itemList: [].concat(itemList, [x[0]])}));

module.exports = {
    fetchUsers,
    fetchTodos,
    appendRandomItem
};