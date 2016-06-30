'use strict';

const helmet = require('../');
const Koa = require('koa');
const request = require('supertest');

describe('integration', function() {
  let app;

  beforeEach(function() {
    app = new Koa();
  });

  describe('default options', function() {
    it('works with the default helmet call', function(done) {
      app.use((ctx, next) => {
        ctx.status = 201;
        return next();
      });
      app.use((ctx, next) => {
        return next().then(() => {
          ctx.body = 'Hello world!';
        });
      });
      app.use(helmet());

      request(app.listen())
        .get('/')
        .set('User-Agent', '')
        .expect('X-Content-Type-Options', 'nosniff')
        .expect('X-Frame-Options', 'SAMEORIGIN')
        .expect('X-Download-Options', 'noopen')
        .expect('X-XSS-Protection', '1; mode=block')
        .expect(201, 'Hello world!', done);
    });
  });

  describe('individual calls', function() {
    it('sets the headers properly', function(done) {
      app.use((ctx, next) => {
        return next().then(() => {
          ctx.status = 201;
        });
      });
      app.use(helmet.noCache());
      app.use(helmet.xssFilter());
      app.use(helmet.frameguard({ action: 'deny' }));
      app.use(helmet.noSniff());
      app.use(helmet.hpkp({
        maxAge: 1000,
        sha256s: ['AbCdEf123=', 'ZyXwVu456='],
        includeSubdomains: true,
        reportUri: 'http://example.com'
      }));

      app.use((ctx) => {
        ctx.body = 'Hello world!';
      });

      request(app.listen())
        .get('/')
        .set('User-Agent', '')
        // noCache
        .expect('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        .expect('Pragma', 'no-cache')
        .expect('Expires', '0')

        // xssFilter
        .expect('X-XSS-Protection', '1; mode=block')

        // frameguard
        .expect('X-Frame-Options', 'DENY')

        // noSniff
        .expect('X-Content-Type-Options', 'nosniff')

        // publicKeyPins
        .expect('Public-Key-Pins', 'pin-sha256="AbCdEf123="; pin-sha256="ZyXwVu456="; max-age=1; includeSubdomains; report-uri="http://example.com"')
        .expect(201, 'Hello world!', done);
    });
  });

});
