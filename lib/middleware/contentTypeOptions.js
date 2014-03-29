'use strict';

/*
 * X-Content-Type-Options
 *
 * The only defined value, "nosniff", prevents Internet Explorer from MIME-sniffing a response away from the declared content-type
 */
module.exports = function () {
  return function *contentTypeOptions(next)  {
    this.set('X-Content-Type-Options', 'nosniff');
    yield next;
  };
};
