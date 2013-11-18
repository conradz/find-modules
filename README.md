# find-modules

[![NPM](https://nodei.co/npm/find-modules.png?compact=true)](https://nodei.co/npm/find-modules/)

[![Build Status](https://drone.io/github.com/conradz/find-modules/status.png)](https://drone.io/github.com/conradz/find-modules/latest)
[![Dependency Status](https://gemnasium.com/conradz/find-modules.png)](https://gemnasium.com/conradz/find-modules)

Recursively find all modules in the `node_modules` folder.

## Example

```js
var findModules = require('find-modules');

findModules(process.cwd(), done);
function done(err, modules) {
    // err contains error if any occurred

    modules.forEach(function(m) {
        console.log(m);
    });
}

// Example output:
// <cwd>/node_modules/foo
// <cwd>/node_modules/foo/node_modules/bar
// <cwd>/node_modules/baz
```

## Reference

### `findModules(dir, callback)`

Recursively finds all module directories in the `node_modules` folders. `dir`
is the root directory to start the search. `callback` will be called when
completed. The first parameter passed to `callback` is an error if any
occurred, otherwise `null`. The second parameter is an array of paths of the
the module directories that were found.
