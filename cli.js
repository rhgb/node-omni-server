'use strict';
const argv = require('minimist')(process.argv.slice(2), {
    alias: {
        h: 'host',
        p: 'port'
    },
    'default': {
        host: 'localhost',
        port: 9000
    }
});

require('./app')(argv.host, argv.port);