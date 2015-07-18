koa-helmet
==========

[![Dependency Status](https://david-dm.org/venables/koa-helmet.png)](https://david-dm.org/venables/koa-helmet)

koa-helmet is a wrapper for [helmet](https://github.com/helmetjs/helmet) to work with [koa](https://github.com/koajs/koa).


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
var koa = require('koa');
var helmet = require('koa-helmet');
var app = koa();

app.use(helmet());
app.use(function *(){
  this.body = 'Hello World';
});

app.listen(4000);
```

Versioning
----------

koa-helmet pins to helmet's major version (koa-helmet 0.x locks to helmet 0.x).
