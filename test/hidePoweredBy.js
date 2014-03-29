var helmet = require('../');

var koa = require('koa');
var request = require('supertest');
var assert = require('assert');

describe('hidePoweredBy', function() {
  var app;

  beforeEach(function() {
    app = koa();
    app.use(function *(next) {
      this.set('X-Powered-By', 'Computers');
      yield next;
    });
    app.use(helmet.hidePoweredBy());
    app.use(function *() {
      this.body = 'Hello world!';
    });
  });

  it('removes the X-Powered-By header', function(done) {
    request(app.listen())
      .get('/')
      .end(function (err, res) {
        if (err) return done(err);
        assert.equal(res.header['x-powered-by'], undefined);
        done();
      });
  });

});
