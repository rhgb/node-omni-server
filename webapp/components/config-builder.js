'use strict';
const React = require('react');
const JsonInput = require('./json-input');
const UrlDisplay = require('./url-display');

module.exports = props => (
    <div>
        <JsonInput onContentChange={(value) => props.onConfigInput(value)}/>
        <UrlDisplay href={props.mockUrl}/>
        <button type="button" onClick={() => props.requestPersistentURL()}>生成持久URL</button>
        <UrlDisplay href={props.persistentUrl}/>
    </div>
);