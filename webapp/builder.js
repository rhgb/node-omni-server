'use strict';
const React = require('react');
const ReactDom = require('react-dom');
const { createStore, applyMiddleware } = require('redux');
const Provider = require('react-redux').Provider;
const promiseMiddleware = require('redux-promise');

const ConfigBuilderApp = require('./components/config-builder-app');
const reducer = require('./reducers');

let store = createStore(reducer, {
    config: {
        raw: '',
        encoded: '',
        isValid: false
    },
    mockUrl: '',
    persistentUrl: ''
}, applyMiddleware(promiseMiddleware));

ReactDom.render(
    <Provider store={store}>
        <ConfigBuilderApp />
    </Provider>,
    document.getElementById('content')
);