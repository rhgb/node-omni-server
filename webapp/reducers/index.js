'use strict';
const ju = require('json-uri');
const actionTypes = require('../actions/types');
const constants = require('../util/constants');

const config = (state, action) => {
    switch (action.type) {
        case actionTypes.TYPE_IN_CONFIG:
            let encoded = '', isValid = true;
            try {
                encoded = JSON.parse(action.configStr);
                encoded = encodeURIComponent(ju.encode(JSON.stringify(encoded)));
            } catch (e) {
                isValid = false;
            }
            return {
                raw: action.configStr,
                encoded,
                isValid
            };
        default: return state;
    }
};

module.exports = (state, action) => {
    switch (action.type) {
        case actionTypes.TYPE_IN_CONFIG:
            let mockUrl = '';
            let newConfigState = config(state.config, action);
            if (newConfigState.isValid) {
                mockUrl = constants.MOCK_URL_PREFIX + newConfigState.encoded;
            }
            return {
                config: newConfigState,
                mockUrl,
                persistentUrl: ''
            };
        case actionTypes.REQ_PERSI_URL:
            if (!action.error) {
                return Object.assign({}, state, {
                    persistentUrl: constants.ORIGIN + action.payload.url
                });
            } else {
                return Object.assign({}, state, {
                    persistentUrl: ''
                });
            }
        default: return state;
    }
};