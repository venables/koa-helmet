var helmet = require('../');

var koa = require('koa');
var request = require('supertest');

describe('integration test', function() {
  var app;

  beforeEach(function() {
    app = koa();

    app.use(helmet.noCache());
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard('deny'));
    app.use(helmet.noSniff());
    app.use(helmet.publicKeyPins({
      maxAge: 1000,
      sha256s: ['AbCdEf123=', 'ZyXwVu456='],
      includeSubdomains: true,
      reportUri: 'http://example.com'
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });
  });

  it('sets the headers properly', function(done) {
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
        .expect('Public-Key-Pins-Report-Only', 'pin-sha256="AbCdEf123="; pin-sha256="ZyXwVu456="; max-age=1; includeSubdomains; report-uri="http://example.com"', done);
  });

});
