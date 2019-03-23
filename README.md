koa-helmet
==========

[![Version](https://img.shields.io/npm/v/koa-helmet.svg)](https://www.npmjs.com/package/koa-helmet)
[![Build Status](https://img.shields.io/travis/venables/koa-helmet/master.svg)](https://travis-ci.org/venables/koa-helmet)
[![Coverage Status](https://img.shields.io/coveralls/venables/koa-helmet.svg)](https://coveralls.io/github/venables/koa-helmet)
[![Dependency Status](https://img.shields.io/david/venables/koa-helmet.svg)](https://david-dm.org/venables/koa-helmet)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)
[![Downloads](https://img.shields.io/npm/dm/koa-helmet.svg)](https://www.npmjs.com/package/koa-helmet)

koa-helmet is a wrapper for [helmet](https://github.com/helmetjs/helmet) to work with [koa](https://github.com/koajs/koa). It provides important security headers to make your app more secure by default.

Installation
------------

```
yarn add koa-helmet
```

or via npm:

```
npm install koa-helmet --save
```

Usage
-----

Usage is the same as [helmet](https://github.com/helmetjs/helmet)

Helmet offers 14 security middleware functions:

| Module | Default? |
|---|---|
| [contentSecurityPolicy](https://helmetjs.github.io/docs/csp/) for setting Content Security Policy |  |
| [permittedCrossDomainPolicies](https://helmetjs.github.io/docs/crossdomain/) for handling Adobe products' crossdomain requests |  |
| [dnsPrefetchControl](https://helmetjs.github.io/docs/dns-prefetch-control) controls browser DNS prefetching | ✓ |
| [expectCt](https://helmetjs.github.io/docs/expect-ct/) for handling Certificate Transparency |  |
| [featurePolicy](https://helmetjs.github.io/docs/feature-policy/) to limit your site's features |  |
| [frameguard](https://helmetjs.github.io/docs/frameguard/) to prevent clickjacking | ✓ |
| [hidePoweredBy](https://helmetjs.github.io/docs/hide-powered-by) to remove the X-Powered-By header | ✓ |
| [hpkp](https://helmetjs.github.io/docs/hpkp/) for HTTP Public Key Pinning |  |
| [hsts](https://helmetjs.github.io/docs/hsts/) for HTTP Strict Transport Security | ✓ |
| [ieNoOpen](https://helmetjs.github.io/docs/ienoopen) sets X-Download-Options for IE8+ | ✓ |
| [noCache](https://helmetjs.github.io/docs/nocache/) to disable client-side caching |  |
| [noSniff](https://helmetjs.github.io/docs/dont-sniff-mimetype) to keep clients from sniffing the MIME type | ✓ |
| [referrerPolicy](https://helmetjs.github.io/docs/referrer-policy) to hide the Referer header |  |
| [xssFilter](https://helmetjs.github.io/docs/xss-filter) adds some small XSS protections | ✓ |

You can see more in [the documentation](https://helmetjs.github.io/docs/).

Note:
-----

In order to work well with the helmet HSTS module, koa-helmet will augment
`this.request` to include a `secure` boolean to determine if the request
is over HTTPS.

Example
-------

```js
"use strict";

const Koa = require("koa");
const helmet = require("koa-helmet");
const app = new Koa();

app.use(helmet());

app.use((ctx) => {
  ctx.body = "Hello World"
});

app.listen(4000);
```


Testing
-------

To run the tests, simply run

```
yarn test
```

Versioning
----------

* koa-helmet >=2.x (master branch) supports koa 2.x
* koa-helmet 1.x ([koa-1](https://github.com/venables/koa-helmet/tree/koa-1) branch) supports koa 0.x and koa 1.x
