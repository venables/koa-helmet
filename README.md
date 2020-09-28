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

Helmet offers 11 security middleware functions:

```js
// This...
app.use(helmet());

// ...is equivalent to this:
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
```

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
