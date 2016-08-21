koa-helmet
==========

[![Version](https://img.shields.io/npm/v/koa-helmet.svg?style=flat-square)](https://www.npmjs.com/package/koa-helmet)
[![Dependency Status](https://img.shields.io/david/venables/koa-helmet.svg?style=flat-square)](https://david-dm.org/venables/koa-helmet)
[![Build Status](https://img.shields.io/travis/venables/koa-helmet/master.svg?style=flat-square)](https://travis-ci.org/venables/koa-helmet)
[![Downloads](https://img.shields.io/npm/dm/koa-helmet.svg?style=flat-square)](https://www.npmjs.com/package/koa-helmet)

koa-helmet is a wrapper for [helmet](https://github.com/helmetjs/helmet) to work with [koa](https://github.com/koajs/koa).

Installation
------------

```
npm install koa-helmet --save
```

Usage
-----

Usage is the same as [helmet](https://github.com/helmetjs/helmet)

Helmet offers 10 security middleware functions:

- [contentSecurityPolicy](https://github.com/helmetjs/csp) for setting Content Security Policy
- [dnsPrefetchControl](https://github.com/helmetjs/dns-prefetch-control) controls browser DNS prefetching
- [frameguard](https://github.com/helmetjs/frameguard) to prevent clickjacking
- [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) to remove the X-Powered-By header
- [hpkp](https://github.com/helmetjs/hpkp) for HTTP Public Key Pinning
- [hsts](https://github.com/helmetjs/hsts) for HTTP Strict Transport Security
- [ieNoOpen](https://github.com/helmetjs/ienoopen) sets X-Download-Options for IE8+
- [noCache](https://github.com/helmetjs/nocache) to disable client-side caching
- [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) to keep clients from sniffing the MIME type
- [xssFilter](https://github.com/helmetjs/x-xss-protection) adds some small XSS protections

Running `app.use(helmet())` will include 7 of the 10, leaving out `contentSecurityPolicy`, `hpkp`, and `noCache`. You can also use each module individually, as documented below.



Example
-------

```js
var Koa = require('koa');
var helmet = require('koa-helmet');
var app = new Koa();

app.use(helmet());

app.use((ctx) => {
  ctx.body = 'Hello World';
});

app.listen(4000);
```


Versioning
----------

* koa-helmet 2.x (master branch) supports koa 2.x
* koa-helmet 1.x ([koa-1](https://github.com/venables/koa-helmet/tree/koa-1) branch) supports koa 0.x and koa 1.x
