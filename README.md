koa-helmet
==========

[![Version](https://img.shields.io/npm/v/koa-helmet.svg?style=flat-square)](https://www.npmjs.com/package/koa-helmet)
[![Dependency Status](https://img.shields.io/david/venables/koa-helmet.svg?style=flat-square)](https://david-dm.org/venables/koa-helmet)
[![Build Status](https://img.shields.io/travis/venables/koa-helmet/master.svg?style=flat-square)](https://travis-ci.org/venables/koa-helmet)
[![Downloads](https://img.shields.io/npm/dm/koa-helmet.svg?style=flat-square)](https://www.npmjs.com/package/koa-helmet)

koa-helmet is a wrapper for [helmet](https://github.com/helmetjs/helmet) to work with [koa](https://github.com/koajs/koa).

NOTE
----

This branch is for koa v2, which uses Promises instead of Generator functions.  For koa 0.x and 1.x support, see the [koa-1](https://github.com/venables/koa-helmet/tree/koa-1) branch.


Versioning
----------

* koa-helmet 1.x (koa-1 branch) supports koa 0.x and koa 1.x
* koa-helmet 2.x (master branch) supports koa 2.x


Installation
------------

```
npm install koa-helmet --save
```

Usage
-----

Usage is the same as [helmet](https://github.com/helmetjs/helmet).


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
