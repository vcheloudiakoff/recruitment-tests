const app = require('../bin/index');

QUnit.module('app');

QUnit.test('One input left', assert => {
    let test = "node bin/index.js";
    console.error('\x1b[33m%s\x1b[0m',`Testing for => ${test}`);
    assert.equal(app(), "Options error", "You should have only one option\nOptions: --filter=[PARAMETER] or --count");
});

QUnit.test('Dont need to have one or more inputs as argument', assert => {
    let test = "node bin/index.js --filter=a error";
    console.error('\x1b[33m%s\x1b[0m',`Testing for => ${test}`);
    assert.equal(app(), "Options error", "You should have only one option\nOptions: --filter=[PARAMETER] or --count");
});

QUnit.test('Option not available', assert => {
    let test = "node bin/index.js --";
    console.error('\x1b[33m%s\x1b[0m',`Testing for => ${test}`);
    assert.equal(app(), "Usage", "Usage: node bin/index.js [ARG] \nARG: --filter=[PARAMETER] or --count");
});

QUnit.test('Option not available', assert => {
    let test = "node bin/index.js e";
    console.error('\x1b[33m%s\x1b[0m',`Testing for => ${test}`);
    assert.equal(app(), "Usage", "Usage: node bin/index.js [ARG] \nARG: --filter=[PARAMETER] or --count");
});

