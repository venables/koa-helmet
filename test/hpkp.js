var helmet = require('../');

var assert = require('assert');
var koa = require('koa');
var request = require('supertest');

describe('hpkp', function() {
  var app;

  beforeEach(function() {
    app = koa();
  });

  it('throws an error when `pins` is not set', function() {
    assert.throws(function() {
      helmet.hpkp();
    }, Error);
  });

  it('throws an error when `pins` contains an unsupported algorithm', function() {
    assert.throws(function() {
      helmet.hpkp({
        pins: {
          sha3: ['foo']
        }
      });
    }, Error);
  });

  it('throws an error when `pins` contains a pin value that is not base64-encoded', function() {
    assert.throws(function() {
      helmet.hpkp({
        pins: {
          sha256: ['foo']
        }
      });
    }, Error);
  });

  it('sets the header when `pins` contains an array of pin values', function(done) {
    app.use(helmet.hpkp({
      pins: {
        sha256: ['d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=']
      }
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });

    request(app.listen())
      .get('/')
      .expect('Public-Key-Pins', 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; max-age=5184000', done);
  });

  it('sets the header when `pins` contains a string pin value', function(done) {
    app.use(helmet.hpkp({
      pins: {
        sha256: 'd6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM='
      }
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });

    request(app.listen())
      .get('/')
      .expect('Public-Key-Pins', 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; max-age=5184000', done);
  });

  it('sets the `includeSubdomains` directive when `includeSubdomains` is enabled', function(done) {
    app.use(helmet.hpkp({
      includeSubdomains: true,
      pins: {
        sha256: ['d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=']
      }
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });

    request(app.listen())
      .get('/')
      .expect('Public-Key-Pins', 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; includeSubdomains; max-age=5184000', done);
  });

  it('sets the `report-uri` directive when `reportUri` is defined', function(done) {
    app.use(helmet.hpkp({
      pins: {
        sha256: 'd6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM='
      },
      reportUri: 'https://example.com/pkp-report'
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });

    request(app.listen())
      .get('/')
      .expect('Public-Key-Pins', 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; report-uri="https://example.com/pkp-report"; max-age=5184000', done);
  });

  it('sets the report only header when `reportOnly` is enabled', function(done) {
    app.use(helmet.hpkp({
      pins: {
        sha256: ['d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM=']
      },
      reportOnly: true,
      reportUri: 'https://example.com/pkp-report'
    }));

    app.use(function *() {
      this.body = 'Hello world!';
    });

    request(app.listen())
      .get('/')
      .expect('Public-Key-Pins-Report-Only', 'pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; report-uri="https://example.com/pkp-report"', done);
  });
});
