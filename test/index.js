var _ = require('underscore');
var helmet = require('helmet');
var koaHelmet = require('../lib');
var assert = require('assert');

function isGenerator(fn) {
  return fn.constructor.name === 'GeneratorFunction';
}

describe('koaHelmet', function() {
  it('wraps all helmet middleware methods to return generator functions', function() {
    var helmetMethods = _.functions(helmet);

    _.each(helmetMethods, function(name) {
      assert(_.isFunction(koaHelmet[name]), 'expected ' + name + ' to be defined as a function');
      assert(isGenerator(koaHelmet[name]()), 'expected ' + name + ' to be a generator function');
    });
  });
});
