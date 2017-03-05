'use strict'

/* eslint-env mocha */

var helmet = require('../')
var koa = require('koa')
var request = require('supertest')

describe('integration test', function () {
  var app

  beforeEach(function () {
    app = koa()
  })

  describe('defaults', function () {
    beforeEach(function () {
      app.use(helmet())

      app.use(function * () {
        this.body = 'Hello world!'
      })
    })

    it('sets the headers properly', function () {
      return request(app.listen())
        .get('/')
        // dnsPrefetchControl
        .expect('X-DNS-Prefetch-Control', 'off')
        // frameguard
        .expect('X-Frame-Options', 'SAMEORIGIN')
        // hsts: Not enabled in HTTP
        // .expect('Strict-Transport-Security', 'max-age=5184000; includeSubDomains')
        // ieNoOpen
        .expect('X-Download-Options', 'noopen')
        // noSniff
        .expect('X-Content-Type-Options', 'nosniff')
        // xssFilter
        .expect('X-XSS-Protection', '1; mode=block')
        .expect(200)
    })
  })

  describe('individual middleware', function () {
    beforeEach(function () {
      app.use(helmet.hsts({
        force: true
      }))
      app.use(helmet.noCache())
      app.use(helmet.xssFilter())
      app.use(helmet.frameguard('deny'))
      app.use(helmet.noSniff())
      app.use(helmet.hpkp({
        maxAge: 1000,
        sha256s: ['AbCdEf123=', 'ZyXwVu456='],
        includeSubdomains: true,
        reportUri: 'http://example.com'
      }))

      app.use(function * () {
        this.body = 'Hello world!'
      })
    })

    it('sets the headers properly', function () {
      return request(app.listen())
        .get('/')
        // noCache
        .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        .expect('Pragma', 'no-cache')
        .expect('Expires', '0')

        // hsts
        .expect('Strict-Transport-Security', 'max-age=15552000; includeSubDomains')

        // xssFilter
        .expect('X-XSS-Protection', '1; mode=block')

        // frameguard
        .expect('X-Frame-Options', 'SAMEORIGIN')

        // noSniff
        .expect('X-Content-Type-Options', 'nosniff')

        // hpkp
        .expect('Public-Key-Pins', 'pin-sha256="AbCdEf123="; pin-sha256="ZyXwVu456="; max-age=1000; includeSubDomains; report-uri="http://example.com"')
    })
  })
})
