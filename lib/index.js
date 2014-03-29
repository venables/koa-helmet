'use strict';

var compose = require('koa-compose');
var fs = require('fs');

fs.readdirSync(__dirname + '/middleware').forEach(function(filename) {
  var middleware;
  var name;

  if (/\.js$/.test(filename)) {
    name = filename.substr(0, filename.lastIndexOf('.'));
    middleware = require('./middleware/' + name);

    module.exports[name] = middleware;
  }
});

module.exports.defaults = function(overrides) {
  var modules = [];

  overrides = overrides || { csp: false };
  overrides.defaults = false;

  for (var name in module.exports) {
    if (overrides[name] !== false) {
      modules.push(module.exports[name]());
    }
  }

  return function *(next) {
    yield compose(modules);
    yield next;
  };
};
