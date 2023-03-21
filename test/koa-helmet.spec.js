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

      // contentSecurityPolicy
      .expect('Content-Security-Policy', 'default-src \'self\';base-uri \'self\';font-src \'self\' https: data:;form-action \'self\';frame-ancestors \'self\';img-src \'self\' data:;object-src \'none\';script-src \'self\';script-src-attr \'none\';style-src \'self\' https: \'unsafe-inline\';upgrade-insecure-requests')

      // crossOriginEmbedderPolicy
      .expect('Cross-Origin-Embedder-Policy', 'require-corp')

      // crossOriginOpenerPolicy
      .expect('Cross-Origin-Opener-Policy', 'same-origin')

      // crossOriginResourcePolicy
      .expect('Cross-Origin-Resource-Policy', 'same-origin')
      
      // dnsPrefetchControl
      .expect('X-DNS-Prefetch-Control', 'off')

      // frameguard
      .expect('X-Frame-Options', 'SAMEORIGIN')

      // hsts
      .expect('Strict-Transport-Security', 'max-age=15552000; includeSubDomains')

      // ieNoOpen
      .expect('X-Download-Options', 'noopen')

      // noSniff
      .expect('X-Content-Type-Options', 'nosniff')

      // referrerPolicy
      .expect('referrer-policy', 'no-referrer')

      // permittedCrossDomainPolicies
      .expect('x-permitted-cross-domain-policies', 'none')

      // xssFilter
      .expect('X-Xss-Protection', '0')

      .expect(200)
      .then(() => t.pass())
      .catch((err) => {
        t.fail(err);}
      )
  );
});

test('it sets individual headers properly', t => {
  const app = new Koa();
  app.use(
    helmet.hsts({
      force: true
    })
  );
  app.use(helmet.crossOriginEmbedderPolicy());
  app.use(helmet.crossOriginOpenerPolicy());
  app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.contentSecurityPolicy());
  app.use(
    helmet.dnsPrefetchControl({
      allow: false,
    })
  );
  app.use(helmet.ieNoOpen());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());
  app.use(helmet.frameguard('deny'));
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.expectCt());

  app.use(ctx => {
    ctx.body = 'Hello world!';
  });

  return (
    request(app.listen())
      .get('/')

      // contentSecurityPolicy
      .expect('Content-Security-Policy', 'default-src \'self\';base-uri \'self\';font-src \'self\' https: data:;form-action \'self\';frame-ancestors \'self\';img-src \'self\' data:;object-src \'none\';script-src \'self\';script-src-attr \'none\';style-src \'self\' https: \'unsafe-inline\';upgrade-insecure-requests')

      // crossOriginEmbedderPolicy
      .expect('Cross-Origin-Embedder-Policy', 'require-corp')

      // crossOriginOpenerPolicy
      .expect('Cross-Origin-Opener-Policy', 'same-origin')

      // crossOriginResourcePolicy
      .expect('Cross-Origin-Resource-Policy', 'same-origin')
      
      // dnsPrefetchControl
      .expect('X-DNS-Prefetch-Control', 'off')

      // referrerPolicy
      .expect('referrer-policy', 'no-referrer')

      // ieNoOpen
      .expect('X-Download-Options', 'noopen')

      // hsts
      .expect(
        'Strict-Transport-Security',
        'max-age=15552000; includeSubDomains'
      )

      // frameguard
      .expect('X-Frame-Options', 'SAMEORIGIN')

      // noSniff
      .expect('X-Content-Type-Options', 'nosniff')

      // permittedCrossDomainPolicies
      .expect('X-Permitted-Cross-Domain-Policies', 'none')

      .then(() => t.pass())
      .catch(err => t.fail(err))
  );
});

test('it reexports middleware exports', t => {
  t.true('getDefaultDirectives' in helmet.contentSecurityPolicy);
  t.true('dangerouslyDisableDefaultSrc' in helmet.contentSecurityPolicy);
});
