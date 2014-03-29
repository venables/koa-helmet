'use strict';

/*
 * HTTP Strict Transport Security (HSTS)
 *
 * http://tools.ietf.org/html/rfc6797
 */
module.exports = function (maxAge, includeSubdomains) {
  if (!maxAge) maxAge = '15768000'; // Approximately 6 months
  var header = "max-age=" + maxAge;

  if (includeSubdomains) header += '; includeSubdomains';

  return function *hsts(next)  {
    if (this.secure || this.get('x-forwarded-proto') === 'https') {
      this.set('Strict-Transport-Security', header);
    }

    yield next;
  };
};

