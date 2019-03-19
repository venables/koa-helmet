'use strict';

const helmet = require('../');
const Koa = require('koa');
const request = require('supertest');
const test = require('ava');

test('it works with the default helmet call', t => {
  const app = new Koa();
  app.use(helmet());
  app.use((ctx) => {
    ctx.body = 'Hello world!';
  });

  return (
    request(app.listen())
      .get('/')

      // dnsPrefetchControl
      .expect('X-DNS-Prefetch-Control', 'off')

      // frameguard
      .expect('X-Frame-Options', 'SAMEORIGIN')

      // hsts: Not enabled in HTTP
      .expect('Strict-Transport-Security', 'max-age=15552000; includeSubDomains')

      // ieNoOpen
      .expect('X-Download-Options', 'noopen')

      // noSniff
      .expect('X-Content-Type-Options', 'nosniff')

      // xssFilter
      .expect('X-XSS-Protection', '1; mode=block')
      .expect(200)
      .then(() => t.pass())
      .catch(err => t.fail(err))
  );
});

test('it sets individual headers properly', t => {
  const app = new Koa();
  app.use(
    helmet.hsts({
      force: true
    })
  );
  app.use(helmet.noCache());
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard('deny'));
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.expectCt());
  app.use(helmet.featurePolicy({
    features: {
      fullscreen: ['\'self\''],
      notifications: ['\'none\''],
      vibrate: ['\'none\'']
    }
  }));
  app.use(
    helmet.hpkp({
      maxAge: 1000,
      sha256s: ['AbCdEf123=', 'ZyXwVu456='],
      includeSubdomains: true,
      reportUri: 'http://example.com'
    })
  );

  app.use(ctx => {
    ctx.body = 'Hello world!';
  });

  return (
    request(app.listen())
      .get('/')
      // noCache
      .expect(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('Pragma', 'no-cache')
      .expect('Expires', '0')

      // hsts
      .expect(
        'Strict-Transport-Security',
        'max-age=15552000; includeSubDomains'
      )

      // xssFilter
      .expect('X-XSS-Protection', '1; mode=block')

      // frameguard
      .expect('X-Frame-Options', 'SAMEORIGIN')

      // noSniff
      .expect('X-Content-Type-Options', 'nosniff')

      // permittedCrossDomainPolicies
      .expect('X-Permitted-Cross-Domain-Policies', 'none')

      // expectCt
      .expect('Expect-CT', 'max-age=0')

      // featurePolicy
      .expect('Feature-Policy', 'fullscreen \'self\';notifications \'none\';vibrate \'none\'')

      // hpkp
      .expect(
        'Public-Key-Pins',
        'pin-sha256="AbCdEf123="; pin-sha256="ZyXwVu456="; max-age=1000; includeSubDomains; report-uri="http://example.com"'
      )
      .then(() => t.pass())
      .catch(err => t.fail(err))
  );
});
