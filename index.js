var fs = require('fs'),
    path = require('path'),
    async = require('async');

module.exports = findModules;

function isScopedModule(dir) {
  return /^@/.test(path.basename(dir));
}

function findModules(dir, callback) {
    var modules = [],
        modulesDir = isScopedModule(dir) ? dir : path.join(dir, 'node_modules');

    fs.readdir(modulesDir, readDir);

    function readDir(err, files) {
        if (err && err.code === 'ENOENT') {
            return callback(null, modules);
        } else if (err) {
            return callback(err);
        }

        files = files.map(function(f) { return path.join(modulesDir, f); });
        async.filter(files, isDir, filtered);
    }

    function filtered(dirs) {
        modules = modules.concat(dirs);
        async.map(dirs, findModules, foundChildren);
    }

    function foundChildren(err, children) {
        if (err) {
            return callback(err);
        }

        children.forEach(function(m) {
            modules = modules.concat(m);
        });

        callback(null, modules.filter(function (dir) {
          return !isScopedModule(dir);
        }));
    }
}

function isDir(file, callback) {
    fs.stat(file, function(err, stat) {
        callback(!err && stat.isDirectory());
    });
}
