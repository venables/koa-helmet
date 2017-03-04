'use strict'

/* eslint-env mocha */

const promisify = require('../lib/promisify')

function passingMiddleware (req, res, next) {
  return next()
}

function failingMiddleware (req, res, next) {
  return next(new Error('Expected Failure'))
}

describe('promisify', function () {
  it('returns a promisified version of the middleware which resolves the Promise on success', function () {
    let middleware = promisify(passingMiddleware)

    return middleware().catch((err) => {
      throw err
    })
  })

  it('returns a promisified version of the middleware which rejects the Promise on failure', function () {
    let middleware = promisify(failingMiddleware)

    return middleware().then(() => {
      throw new Error('Unexpected Success!')
    }, () => {
      // Expect failure, do not fail test
    })
  })
})
