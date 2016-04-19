'use strict';
const React = require('react');
const JsonBuilder = require('./json-builder');
const UrlDisplay = require('./url-display');

module.exports = props => (
    <div>
        <JsonBuilder value={props.configStr} onContentChange={(value) => props.onConfigInput(value)}/>
        <UrlDisplay href={props.mockUrl}/>
        <button type="button" onClick={() => props.requestPersistentURL()}>生成持久URL</button>
        <UrlDisplay href={props.persistentUrl}/>
    </div>
);