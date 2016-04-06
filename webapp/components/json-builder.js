'use strict';
const React = require('react');
const JsonForm = require('./json-form');
const JsonInput = require('./json-input');

module.exports = props => (
    <div className="json-builder">
        <JsonForm onChange={e=>console.log(e)} />
        <JsonInput onChange={props.onContentChange} />
    </div>
);