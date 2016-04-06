'use strict';
const React = require('react');
import JsonSchemaForm from 'react-jsonschema-form';
const schema = require('../../config-schema.json');
const uiSchema = require('../../config-ui-schema.json');
module.exports = props => (
    <div>
        <JsonSchemaForm
            schema={schema}
            uiSchema={uiSchema}
            onChange={props.onChange}
        />
    </div>
);