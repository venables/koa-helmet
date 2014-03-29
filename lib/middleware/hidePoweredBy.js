'use strict';

/*
 * Remove the X-Powered-By header if present
 */
module.exports = function () {
  return function *hidePoweredBy(next) {
    this.remove('X-Powered-By');
    yield next;
  };
};
