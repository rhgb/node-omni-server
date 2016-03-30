'use strict';
require('whatwg-fetch');
const types = require('./types');
const constants = require('../util/constants');
module.exports = {
    typeInConfig: configStr => ({
        type: types.TYPE_IN_CONFIG,
        configStr
    }),
    requestPersistentURL: configEncoded => ({
            type: types.REQ_PERSI_URL,
            payload: fetch(constants.CREATE_URL_PREFIX + configEncoded, {
                method: 'POST'
            }).then(res => res.json())
        })
};