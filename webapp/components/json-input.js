'use strict';
const React = require('react');

module.exports = ({onContentChange}) => (
        <textarea className="json-input"
                  placeholder="Config JSON"
                  onChange={e=>onContentChange(e.target.value)}/>
    );