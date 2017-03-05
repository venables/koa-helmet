'use strict'

const helmet = require('helmet')

function koaHelmet () {
  const args = arguments

  return function * (next) {
    this.req.secure = this.request.secure
    yield helmet.apply(null, args).bind(null, this.req, this.res)
    yield next
  }
}

Object.keys(helmet).forEach(function (helmetMethod) {
  koaHelmet[helmetMethod] = function () {
    const args = arguments

    return function * (next) {
      this.req.secure = this.request.secure
      yield helmet[helmetMethod].apply(null, args).bind(null, this.req, this.res)
      yield next
    }
  }
})

module.exports = koaHelmet
