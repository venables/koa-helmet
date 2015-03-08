var helmet = require('../');

var koa = require('koa');
var request = require('supertest');
var assert = require('assert');

describe('permittedCrossDomainPolicies', function() {
  var app;

  beforeEach(function() {
    app = koa();
  });

  it('sets header to "none" by default', function(done) {
    app.use(helmet.permittedCrossDomainPolicies());

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'none', done);
  });

  it('sets header properly when called with "all"', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('all'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'all', done);
  });

  it('sets header properly when called with "by-content-type"', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('by-content-type'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'by-content-type', done);
  });

  it('sets header properly when called with "by-ftp-filename"', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('by-ftp-filename'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'by-ftp-filename', done);
  });

  it('sets header properly when called with "master-only"', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('master-only'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'master-only', done);
  });

  it('sets header properly when called with "none"', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('none'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'none', done);
  });

  it('sets header in lowercase if called with uppercase policy', function(done) {
    app.use(helmet.permittedCrossDomainPolicies('ALL'));

    request(app.listen())
      .get('/')
      .expect('X-Permitted-Cross-Domain-Policies', 'all', done);
  });

  it('throws an error when policy is not valid', function() {
    assert.throws(function() {
      helmet.permittedCrossDomainPolicies('foo');
    }, Error);
  });
});
