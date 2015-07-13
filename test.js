var test = require('tap').test,
    path = require('path'),
    findModules = require('./');

function rel(file) {
    return path.normalize(path.join(__dirname, file));
}

test('find test modules', function(t) {
    t.plan(2);

    findModules(rel('test'), found);
    function found(err, modules) {
        t.error(err, 'successful');
        modules.sort();
        t.deepEqual(modules, [
            rel('test/node_modules/@scoped/baz'),
            rel('test/node_modules/@scoped/bing'),
            rel('test/node_modules/@scoped/bing/node_modules/boop'),
            rel('test/node_modules/bar'),
            rel('test/node_modules/foo'),
            rel('test/node_modules/foo/node_modules/baz')
        ]);
    }
});
