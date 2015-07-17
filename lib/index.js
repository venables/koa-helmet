'use strict';

var helmet = require('helmet');

var koaHelmet = function() {
  var args = arguments;

  return function * (next) {
    yield helmet.apply(null, args).bind(null, this.req, this.res);
    yield next;
  }
};

Object.keys(helmet).forEach(function(helmetMethod) {
  koaHelmet[helmetMethod] = function() {
    var args = arguments;

    return function *(next) {
      yield helmet[helmetMethod].apply(null, args).bind(null, this.req, this.res);
      yield next;
    }
  }
});

module.exports = koaHelmet;
