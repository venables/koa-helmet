'use strict'

/**
 * Takes an express-style middleware and returns a promise-based version (returning a Promise,
 * rather than calling the final argument as a callback) suitable for use with koa.
 *
 * @param {Function} middleware - The middleware to promisify
 * @returns {Function} - The middleware function updated to return a Promise, not call a callback
 */
const promisify = function koaHelmetPromisify (middleware) {
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

module.exports = promisify
