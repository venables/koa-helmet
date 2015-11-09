'use strict';

const helmet = require('helmet');
const Bluebird = require('bluebird');

var koaHelmet = function() {
  const helmetPromise = Bluebird.promisify(helmet.apply(null, arguments));

  return (ctx, next) => {
    return helmetPromise(ctx.req, ctx.res).then(next);
  };
};

Object.keys(helmet).forEach(function(helmetMethod) {
  koaHelmet[helmetMethod] = function() {
    const method = helmet[helmetMethod];
    const methodPromise = Bluebird.promisify(method.apply(null, arguments));

    return (ctx, next) => {
      return methodPromise(ctx.req, ctx.res).then(next);
    }
  }
});

module.exports = koaHelmet;
