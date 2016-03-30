'use strict';
const React = require('react');
const select = require('select');

function copyUrl(input) {
    select(input) && document.execCommand && document.execCommand('copy');
}

module.exports = React.createClass({
    render: function() {
        return (
            <div className="url-display">
                <input value={this.props.href} ref={ref => this.urlInput = ref} readOnly />
                <button type="button" onClick={()=>copyUrl(this.urlInput)}>复制URL</button>
            </div>
        );
    }
});