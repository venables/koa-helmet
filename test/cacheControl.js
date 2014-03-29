var helmet = require('../');

var koa = require('koa');
var request = require('supertest');

describe('cacheControl', function() {
  var app;

  beforeEach(function() {
    app = koa();
    app.use(helmet.cacheControl());
    app.use(function *() {
      this.body = 'Hello world!';
    });
  });

  it('sets header properly', function(done) {
    request(app.listen())
      .get('/')
      .expect('Cache-Control', 'no-store, no-cache', done);
  });
});
