koa-helmet
==========

[![Dependency Status](https://david-dm.org/venables/koa-helmet.png)](https://david-dm.org/venables/koa-helmet)

koa-helmet is a fork of [Helmet](https://github.com/helmetjs/helmet) which has been updated to work with [koa](https://github.com/koajs/koa).

koa-helmet is a series of middleware for koa apps that implement various security headers to make your app more secure.

koa-helmet includes the following middleware:

- `csp` (Content Security Policy)
- `hpkp` (HTTP Public Key Pinning)
- `hsts` (HTTP Strict Transport Security)
- `xframe` (X-Frame-Options)
- `iexss` (X-XSS-Protection for IE8+)
- `ienoopen` (X-Download-Options for IE8+)
- `contentTypeOptions` (X-Content-Type-Options)
- `cacheControl` (Cache-Control)
- `permittedCrossDomainPolicies` (X-Permitted-Cross-Domain-Policies)

Installation
------------

    npm install koa-helmet

Basic usage
-----------


To use a particular middleware application-wide, just `use` it:

```javascript
var helmet = require('koa-helmet');
var app = koa();

app.use(helmet.csp());
app.use(helmet.xframe('deny'));
app.use(helmet.contentTypeOptions());
```

*Make sure to `app.use` helmet middleware before your router.*

If you just want to use the default-level policies, all you need to do is:

```javascript
app.use(helmet.defaults());
```

Don't want all the defaults?

```javascript
helmet.defaults({ xframe: false });
app.use(helmet.xframe('sameorigin'));
```

Content Security Policy
------------------------

Setting an appropriate Content Security Policy can protect your users against a variety of
attacks (perhaps the largest of which is XSS). To learn more about CSP, check out the [HTML5 Rocks guide](http://www.html5rocks.com/en/tutorials/security/content-security-policy/).

Usage:

```javascript
app.use(helmet.csp({
  'default-src': ["'self'", 'default.com'],
  'script-src': ['scripts.com'],
  'style-src': ['style.com'],
  'img-src': ['img.com'],
  'connect-src': ['connect.com'],
  'font-src': ['font.com'],
  'object-src': ['object.com'],
  'media-src': ['media.com'],
  'frame-src': ['frame.com'],
  'sandbox': ['allow-forms', 'allow-scripts'],
  'report-uri': ['/report-violation'],
  reportOnly: false, // set to true if you only want to report errors
  setAllHeaders: false, // set to true if you want to set all headers
  safari5: false // set to true if you want to force buggy CSP in Safari 5
})
```

There are a lot of inconsistencies in how browsers implement CSP. Helmet sniffs the user-agent of
the browser and sets the appropriate header and value for that browser. If no user-agent is found,
it will set _all_ the headers with the 1.0 spec.

HTTP Public Key Pining
-------------------------------

This middleware adds the `Public-Key-Pins` header to the response. [See the spec.](https://tools.ietf.org/html/draft-ietf-websec-key-pinning-21#section-2.3.3)

To use the default header of `Public-Key-Pins: max-age=5184000` (about 2 months), pass the base64-encoded **Subject Public Key Information** (SPKI) fingerprint via the `pins` option:

```javascript
app.use(helmet.hpkp({
    pins: { sha256: ['base64=='] } 
}));
```

Currently, only `sha256` is supported as the hashing algorithm by HPKP. This may change in the future.

Optionally, you may set a custom `maxAge`:

```javascript
app.use(helmet.hpkp({ maxAge: 1234567 }));
```

Note that the max age is in _seconds_, not milliseconds (as is typical in JavaScript).

You may also enable the `includeSubdomains` flag:

```javascript
app.use(helmet.hpkp({ includeSubdomains: true }));
```

Enable the report of pin validation failures:

```javascript
app.use(helmet.hpkp({ reportUri: 'https://example.com/pkp-report' }));
```

Or enable the "report only" mode:

```javascript
app.use(helmet.hpkp({ reportOnly: true, reportUri: 'https://example.com/pkp-report' }));
```

HTTP Strict Transport Security
-------------------------------

This middleware adds the `Strict-Transport-Security` header to the response. [See the spec.](http://tools.ietf.org/html/draft-ietf-websec-strict-transport-sec-04)

To use the default header of `Strict-Transport-Security: max-age=15768000` (about 6 months):

```javascript
app.use(helmet.hsts());
```

To adjust other values for `maxAge` and to include subdomains:

```javascript
app.use(helmet.hsts(1234567, true, false));
```

Note that the max age is in _seconds_, not milliseconds (as is typical in JavaScript).

To enable the `preload` flag in the HSTS header with a custom `maxAge` and `includeSubdomains` set as follows:

```javascript
app.use(helmet.hsts(1234567, true, true));
```

Note the `preload` flag is required for domain includision in Chrome's HSTS (preload)[https://hstspreload.appspot.com/] list. This is a list of sites that are hardcoded into Chrome as being HTTPS only.

X-Frame-Options
---------------

X-Frame specifies whether your app can be put in a frame or iframe. It has three
modes: `DENY`, `SAMEORIGIN`, and `ALLOW-FROM`. If your app does not need to be framed (and most
don't) you can use the default `DENY`.

Usage:

```javascript
// These are equivalent:
app.use(helmet.xframe());
app.use(helmet.xframe('deny'));

// Only let me be framed by people of the same origin:
app.use(helmet.xframe('sameorigin'));

// Allow from a specific host:
app.use(helmet.xframe('allow-from', 'http://example.com'));
```

### Browser Support

- IE8+
- Opera 10.50+
- Safari 4+
- Chrome 4.1.249.1042+
- Firefox 3.6.9 (or earlier with NoScript)

X-XSS-Protection
-----------------

The X-XSS-Protection header is a basic protection against XSS.

Usage:

```javascript
app.use(helmet.iexss());
```

This sets the `X-XSS-Protection` header. On modern browsers, it will set the value
to `1; mode=block`. On old versions of Internet Explorer, this creates a vulnerability
(see [here](http://hackademix.net/2009/11/21/ies-xss-filter-creates-xss-vulnerabilities/) and
[here](http://technet.microsoft.com/en-us/security/bulletin/MS10-002)), and so the header is set
to `0`. To force the header on all versions of IE, add the option:

```javascript
app.use(helmet.iexss({ setOnOldIE: true }));
```

## X-Download-Options

Sets the `X-Download-Options` header to `noopen` to prevent IE users from executing downloads in
your site's context. For more, see [this MSDN blog post](http://blogs.msdn.com/b/ie/archive/2008/07/02/ie8-security-part-v-comprehensive-protection.aspx).

```javascript
app.use(helmet.ienoopen());
```

X-Content-Type-Options
----------------------

The following example sets the `X-Content-Type-Options` header to its only and default option, `nosniff`:

```javascript
app.use(helmet.contentTypeOptions());
```

Cache-Control
-------------

The following example sets the `Cache-Control` header to `no-store, no-cache`. This is not configurable at this time.

```javascript
app.use(helmet.cacheControl());
```

X-Permitted-Cross-Domain-Policies
---------------------------------

Sets the `X-Permitted-Cross-Domain-Policies` header. Restricts Adobe Flash Player and Adobe Reader's access to data. For more, see [this Adobe blog post](https://www.adobe.com/devnet/adobe-media-server/articles/cross-domain-xml-for-streaming.html).

```javascript
app.use(helmet.permittedCrossDomainPolicies());
```
