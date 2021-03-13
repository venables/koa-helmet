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
    const methodPromise = promisify(helmet[helmetMethod].apply(null, arguments));

    return (ctx, next) => {
      ctx.req.secure = ctx.request.secure;
      return methodPromise(ctx.req, ctx.res).then(next);
    };
  };
  Object.keys(helmet[helmetMethod]).forEach((methodExports) => {
    koaHelmet[helmetMethod][methodExports] = helmet[helmetMethod][methodExports];
  });
});

module.exports = koaHelmet;
