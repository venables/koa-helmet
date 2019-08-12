'use strict';

const helmet = require('helmet');
const { promisify } = require('util');

const koaHelmet = function () {
  const helmetPromise = promisify(helmet.apply(null, arguments));

  const middleware = (ctx, next) => {
    ctx.req.secure = ctx.request.secure;
    return helmetPromise(ctx.req, ctx.res).then(next);
  };
  middleware._name = 'helmet';
  return middleware;
};

Object.keys(helmet).forEach(function (helmetMethod) {
  koaHelmet[helmetMethod] = function () {
    const method = helmet[helmetMethod];
    const methodPromise = promisify(method.apply(null, arguments));

    return (ctx, next) => {
      ctx.req.secure = ctx.request.secure;
      return methodPromise(ctx.req, ctx.res).then(next);
    };
  };
});

module.exports = koaHelmet;
