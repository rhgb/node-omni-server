'use strict';
const React = require('react');

const JsonInput = React.createClass({
    render: function () {
        return (
            <textarea className="json-input"
                      placeholder="Config JSON"
                      onChange={this.handleChange}/>
        );
    },
    handleChange: function (e) {
        const content = e.target.value;
        this.props.onContentChange && this.props.onContentChange(content);
    }
});

module.exports = JsonInput;