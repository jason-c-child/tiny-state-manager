'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appState = function appState(seedState) {
    var emitter = new _events2.default();
    var state = seedState || {};

    emitter.on('set', function (payload) {
        state = payload;
        this.callback(state);
    });

    emitter.on('reset', function () {
        seedState && (state = seedState);
        this.callback(state);
    });

    emitter.on('update', function (payload) {
        state = _extends({}, state, payload);
        this.callback(state);
    });

    return {
        emitter: emitter,
        state: state
    };
};

exports.default = appState;