'use strict';

/*
 * Cache-Control
 */
module.exports = function () {
  return function *cacheControl(next)  {
    this.set('Cache-Control', 'no-store, no-cache');
    yield next;
  };
};
