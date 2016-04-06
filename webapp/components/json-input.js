'use strict';
const React = require('react');

module.exports = ({onChange}) => (
        <textarea className="json-input"
                  placeholder="Config JSON"
                  onChange={e=>onChange(e.target.value)}/>
    );