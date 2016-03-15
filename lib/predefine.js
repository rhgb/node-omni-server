'use strict';
const co = require('co');
const replier = require('./replier');

const charset = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

let nameLength = 3;

const storage = new Map();

function randomChar() {
    return charset[Math.floor(Math.random() * charset.length)];
}

function randomName(length) {
    let name = '';
    for (let i = 0; i < length; i++) {
        name += randomChar();
    }
    return name;
}

function generateName() {
    if (storage.size > Math.pow(charset.length, nameLength - 1)) {
        nameLength++;
    }
    let name;
    do {
        name = randomName(nameLength);
    } while (storage.has(name));
    return name;
}

module.exports = {
    create: co.wrap(function *(ctx) {
        const config = replier.resolve(ctx);
        if (config) {
            const name = generateName();
            storage.set(name, config);
            ctx.body = {
                key: name,
                url: `/predefined/${name}`
            }
        } else {
            ctx.status = 400;
            ctx.message = 'Invalid Config';
        }
    }),
    fetch: co.wrap(function *(ctx, name) {
        if (storage.has(name)) {
            const config = storage.get(name);
            yield replier.generate(ctx, config);
        } else {
            ctx.status = 404;
            ctx.message = 'Definition Not Found';
        }
    })
};