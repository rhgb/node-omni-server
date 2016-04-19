'use strict';
const React = require('react');
const JsonForm = require('./json-form');
const JsonInput = require('./json-input');

function parseJSON(str) {
    let res;
    try {
        res = JSON.parse(str);
    } catch(e) {}
    return res;
}

module.exports = ({value, onContentChange}) => (
    <div className="json-builder">
        <JsonForm formData={parseJSON(value)} onChange={onContentChange} />
        <JsonInput value={value} onChange={onContentChange} />
    </div>
);