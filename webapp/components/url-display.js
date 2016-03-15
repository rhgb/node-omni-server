'use strict';
const React = require('react');
const select = require('select');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="url-display">
                <input value={this.props.href} ref={ref => this.urlInput = ref} readOnly />
                <button type="button" onClick={this.copyUrl}>复制URL</button>
            </div>
        );
    },
    copyUrl: function () {
        select(this.urlInput) && document.execCommand && document.execCommand('copy');
    }
});