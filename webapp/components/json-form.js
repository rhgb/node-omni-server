'use strict';
const React = require('react');
import JsonSchemaForm from 'react-jsonschema-form';
const schema = require('../../config-schema.json');
const uiSchema = require('../../config-ui-schema.json');

function onFormInput(e, parentOnChange) {
    console.log(e);
    parentOnChange(JSON.stringify(e.formData, null, 2));
}

module.exports = ({formData, onChange}) => (
    <div className="json-form">
        <JsonSchemaForm
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={e => onFormInput(e, onChange)}
        />
    </div>
);