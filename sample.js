'use strict';
const ju = require('json-uri');
const s = require('./sample.json');
console.log(encodeURIComponent(ju.encode(JSON.stringify(s))));