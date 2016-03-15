'use strict';
const co = require('co');
const ju = require('json-uri');
const util = require('util');
const debug = require('debug')('omni-server');

const resolve = function (ctx) {
    const q = ctx.query.q;
    if (!q) return null;
    let config;
    try {
        config = JSON.parse(ju.decode(q));
        debug('config: %s', util.inspect(config, {depth: 4}));
    } catch(e) {
        return null;
    }
    return config;
};

const generate = co.wrap(function *(ctx, config) {
    if (config.status) {
        let status = ~~config.status;
        if (status >= 100 && status < 600) {
            debug('set status: %s', status);
            ctx.status = status;
        }
    }

    if (config.headers && config.headers instanceof Array) {
        for (let header of config.headers) {
            if (header instanceof Array && header.length === 2) {
                debug('set header: %s', header);
                ctx.set(header[0], header[1]);
            }
        }
    }

    if (config.setCookies && config.setCookies instanceof Array) {
        for (let cookie of config.setCookies) {
            if (cookie instanceof Array && cookie.length >= 2) {
                if (cookie[2] && cookie[2].expires) {
                    cookie[2].expires = new Date(cookie[2].expires);
                }
                debug('set cookie: %s', util.inspect(cookie, {depth: 3}));
                ctx.cookies.set('' + cookie[0], '' + cookie[1], cookie[2]);
            }
        }
    }

    if (config.clearCookies && config.clearCookies instanceof Array) {
        for (let name of config.clearCookies) {
            debug('clear cookie: %s', name);
            ctx.cookies.set('' + name);
        }
    }

    if (config.latency) {
        let latency = ~~config.latency;
        if (latency > 0) {
            debug('response latency: %s', latency);
            yield new Promise((resolve) => {
                setTimeout(resolve, latency);
            });
        }
    }

    if (config.content) {
        ctx.body = config.content;
    } else {
        ctx.body = ctx.request;
    }
});

module.exports = { resolve, generate };
