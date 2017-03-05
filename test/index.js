'use strict'

/* eslint-env mocha */

const helmet = require('helmet')
const koaHelmet = require('../')
const assert = require('assert')

function isGenerator (fn) {
  return fn.constructor.name === 'GeneratorFunction'
}

describe('koaHelmet', function () {
  it('wraps all helmet middleware methods to return generator functions', function () {
    Object.keys(helmet).forEach(function (name) {
      if (typeof helmet[name] !== 'function') {
        return
      }

      assert(isGenerator(koaHelmet[name]()), 'expected ' + name + ' to be a generator function')
    })
  })
})
