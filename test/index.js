'use strict'

/* eslint-env mocha */

var helmet = require('helmet')
var koaHelmet = require('../lib')
var assert = require('assert')

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
