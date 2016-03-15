'use strict';
const $ = require('jquery');
const React = require('react');
const ju = require('json-uri');
const JsonInput = require('./json-input');
const UrlDisplay = require('./url-display');

const ORIGIN = location.protocol + '//' + location.host;
const MOCK_URL_PREFIX = ORIGIN + '/response?q=';
const CREATE_URL_PREFIX = ORIGIN + '/create?q=';

const ConfigBuilder = React.createClass({
    getInitialState: function () {
        return {
            configString: '',
            mockUrl: '',
            persistentUrl: ''
        }
    },
    render: function () {
        return (
            <div>
                <JsonInput onContentChange={this.handleContentChange}/>
                <UrlDisplay href={this.state.mockUrl}/>
                <button type="button" onClick={this.createPersistentUrl}>生成持久URL</button>
                <UrlDisplay href={this.state.persistentUrl}/>
            </div>
        );
    },
    handleContentChange: function (content) {
        let conf = '';
        try {
            conf = JSON.parse(content);
            conf = encodeURIComponent(ju.encode(JSON.stringify(conf)));
        } catch (e) {}
        this.setState({
            configString: conf,
            mockUrl: conf ? MOCK_URL_PREFIX + conf : ''
        });
    },
    createPersistentUrl: function () {
        const configString = this.state.configString;
        if (configString) {
            $.post(CREATE_URL_PREFIX + configString, data => {
                this.setState({
                    persistentUrl: ORIGIN + data.url
                });
            }, 'json');
        }
    }
});

module.exports = ConfigBuilder;