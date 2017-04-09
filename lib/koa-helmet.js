'use strict'

const helmet = require('helmet')
const promisify = require('./promisify')

function koaHelmet (opts) {
  let options = Object.assign({}, opts, { hidePoweredBy: false })
  let helmetPromise = promisify(helmet(options))

  return (ctx, next) => {
    ctx.req.secure = ctx.request.secure
    return helmetPromise(ctx.req, ctx.res).then(next)
  }
}

Object.keys(helmet).forEach(function (helmetMethod) {
  if (helmetMethod === 'hidePoweredBy') {
    return
  }

  koaHelmet[helmetMethod] = function () {
    const method = helmet[helmetMethod]
    const methodPromise = promisify(method.apply(null, arguments))

    return (ctx, next) => {
      ctx.req.secure = ctx.request.secure
      return methodPromise(ctx.req, ctx.res).then(next)
    }
  }
})

module.exports = koaHelmet
