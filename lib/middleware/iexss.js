'use strict';

/*
 * Add X-XSS-Protection header
 */

var platform = require('platform');

module.exports = function (options) {
  options = options || {};

  return function *iexss(next)  {
    var browser = platform.parse(this.get('user-agent'));
    var version = parseFloat(browser.version);
    var isIE = browser.name === 'IE';
    var value;

    if ((!isIE) || (version >= 9) || (options.setOnOldIE)) {
      value = '1; mode=block';
    } else {
      value = '0';
    }

    this.set('X-XSS-Protection', value);
    yield next;
  };
};
