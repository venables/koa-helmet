'use strict'

const helmet = require('helmet')

const promisifyMiddleware = function (middleware) {
  return function (req, res) {
    return new Promise(function (resolve, reject) {
      middleware(req, res, function (err) {
        if (err) {
          return reject(err)
        }

        return resolve()
      })
    })
  }
}

const koaHelmet = function () {
  const helmetPromise = promisifyMiddleware(helmet.apply(null, arguments))

  return (ctx, next) => {
    ctx.req.secure = ctx.request.secure
    return helmetPromise(ctx.req, ctx.res).then(next)
  }
}

Object.keys(helmet).forEach(function (helmetMethod) {
  koaHelmet[helmetMethod] = function () {
    const method = helmet[helmetMethod]
    const methodPromise = promisifyMiddleware(method.apply(null, arguments))

    return (ctx, next) => {
      ctx.req.secure = ctx.request.secure
      return methodPromise(ctx.req, ctx.res).then(next)
    }
  }
})

module.exports = koaHelmet
