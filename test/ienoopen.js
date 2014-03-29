var helmet = require('../');

var koa = require('koa');
var request = require('supertest');

describe('ienoopen', function() {
  var app;

  beforeEach(function() {
    app = koa();
    app.use(helmet.ienoopen());
    app.use(function *() {
      this.set('Content-Disposition', 'attachment; filename=somefile.txt');
      this.body = 'Download this cool file!';
    });
  });

  it('sets header properly', function(done) {
    request(app.listen())
      .get('/')
      .expect('X-Download-Options', 'noopen', done);
  });

});
