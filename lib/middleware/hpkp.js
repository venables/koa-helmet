'use strict';

var _ = require('underscore');
var util = require('util');
var base64 = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})$/;

/**
 * Test if a string is base64-encoded.
 */
function isBase64(hash) {
  return !base64.test(hash)
};

/*
 * HTTP Public Key Pinning (HPKP).
 *
 * https://tools.ietf.org/html/draft-ietf-websec-key-pinning-21
 */
module.exports = function (options) {
  options = _.extend({}, {
    includeSubdomains: false,
    maxAge: 5184000, // approximately 2 months
    reportOnly: false
  }, options);

  // The header name.
  var header = 'Public-Key-Pins';

  if (options.pins === undefined) {
    throw new Error('A map of `pins` must be defined');
  }

  if (!_.contains(_.keys(options.pins), 'sha256') || _.size(options.pins) > 1) {
    throw new Error('Only pins with `sha256` tokens are supported');
  }

  _.forEach(options.pins, function(hashes, algorithm) {
    if (_.some(_.flatten([hashes]), isBase64)) {
      throw new Error('All hashes must be base64-encoded');
    }
  })

  if (options.reportOnly && options.reportUri === undefined) {
    throw new Error('Please disable `reportOnly` mode or add a `reportUri`');
  }

  var value = _.flatten(_.map(options.pins, function(hashes, algorithm) {
    return _.map(_.flatten([hashes]), function(hash) {
      return util.format('pin-%s="%s"', algorithm, hash);
    });
  }));

  if (options.includeSubdomains) {
    value.push('includeSubdomains');
  }

  if (options.reportUri) {
    value.push(util.format('report-uri="%s"', options.reportUri));
  }

  if (options.reportOnly) {
    header += '-Report-Only';
  } else {
    // The `maxAge` directive is meaningless within a
    // "Public-Key-Pins-Report-Only" header field.
    value.push(util.format('max-age=%s', options.maxAge));
  }

  value = value.join('; ');

  return function *hpkp(next)  {
    this.set(header, value);

    yield next;
  };
};
