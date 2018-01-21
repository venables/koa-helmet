'use strict';

const promisify = require('../lib/promisify');
const test = require('ava');

function passingMiddleware (req, res, next) {
  return next();
}

function failingMiddleware (req, res, next) {
  return next(new Error('Expected Failure'));
}

test('returns a promisified version of the middleware which resolves the Promise on success', t => {
  let middleware = promisify(passingMiddleware);

  return middleware().then(
    () => {
      t.pass();
    },
    err => {
      t.fail(err);
    }
  );
});

test('returns a promisified version of the middleware which rejects the Promise on failure', t => {
  let middleware = promisify(failingMiddleware);

  return middleware().then(
    () => {
      t.fail('Unexpected Success!');
    },
    () => {
      t.pass();
    }
  );
});
