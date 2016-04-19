'use strict';
import React from 'react';
import {Subject} from 'rxjs';
import JsonSchemaForm from 'react-jsonschema-form';
import {validate} from 'jsonschema';
const schema = require('../../config-schema.json');
const uiSchema = require('../../config-ui-schema.json');
const isValid = data => validate(data, schema).valid;

export default class JsonForm extends React.Component {
    render() {
        const {formData} = this.props;
        return (
            <div className="json-form">
                <JsonSchemaForm
                    schema={schema}
                    uiSchema={uiSchema}
                    formData={formData}
                    onChange={e => this.onFormInput(e)}
                />
            </div>
        );
    }

    componentDidMount() {
        this.inputSubject = new Subject();
        this.inputSubscription = this.inputSubject
            .debounceTime(500)
            .filter(e => isValid(e.formData))
            .map(e => JSON.stringify(e.formData, null, 2))
            .subscribe({
                next: v => this.props.onChange(v)
        });
    }

    componentWillUnmount() {
        this.inputSubscription.unsubscribe();
    }

    onFormInput(e) {
        this.inputSubject.next(e);
    }
}