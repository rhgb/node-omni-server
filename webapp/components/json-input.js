'use strict';
const React = require('react');

module.exports = ({value, onChange}) => (
        <textarea className="json-input"
                  placeholder="Config JSON"
                  value={value}
                  onChange={e=>onChange(e.target.value)}/>
    );