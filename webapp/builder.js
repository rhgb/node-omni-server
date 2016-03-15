'use strict';
const React = require('react');
const ReactDom = require('react-dom');
const ConfigBuilder = require('./components/config-builder');

require('./style.less');

ReactDom.render(
    <ConfigBuilder />,
    document.getElementById('content')
);