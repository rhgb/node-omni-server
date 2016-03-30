'use strict';
const ORIGIN = location.protocol + '//' + location.host;
const MOCK_URL_PREFIX = ORIGIN + '/response?q=';
const CREATE_URL_PREFIX = ORIGIN + '/create?q=';

module.exports = {
    ORIGIN,
    MOCK_URL_PREFIX,
    CREATE_URL_PREFIX
};