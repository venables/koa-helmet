var helmet = require('../');

var koa = require('koa');
var request = require('supertest');

describe('contentTypeOptions', function() {
  var app;

  beforeEach(function() {
    app = koa();
    app.use(helmet.contentTypeOptions());
    app.use(function *() {
      this.body = 'Hello world!';
    });
  });

  it('sets header properly', function(done) {
    request(app.listen())
      .get('/')
      .expect('X-Content-Type-Options', 'nosniff', done);
  });
});
