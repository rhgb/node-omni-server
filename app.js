'use strict';
const koa = require('koa');
const replier = require('./lib/replier');
const predefine = require('./lib/predefine');

const PREDEF_REG = /^\/predefined\/(\w+)$/;
/**
 * Create a server
 * @param {string} host
 * @param {number} port
 * @returns {*}
 */
module.exports = function (host, port) {
    const app = koa();
    app.use(function *(next) {
        if (this.path === '/response') {
            const config = replier.resolve(this);
            if (this) {
                yield replier.generate(this, config);
            } else {
                this.status = 400;
                this.message = "Invalid Config";
            }

        } else if (this.path === '/create' && this.method === 'POST') {
            yield predefine.create(this);

        } else if (PREDEF_REG.test(this.path)) {
            let matched = this.path.match(PREDEF_REG);
            matched = matched[1];
            yield predefine.fetch(this, matched);
        }
        yield next;
    });
    app.use(require('koa-static')('./public'));
    app.listen(port, host);
    return app;
};