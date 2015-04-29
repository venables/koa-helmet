'use strict';

var _ = require('underscore');
var util = require('util');

/**
 * Valid policies.
 */
var POLICIES = [
  'all',
  'by-content-type',
  'by-ftp-filename',
  'master-only',
  'none'
];

/*
 * X-Permitted-Cross-Domain-Policies
 *
 * Defines how Adobe Flash Player or Adobe Acrobat handle data
 * across domains.
 */
module.exports = function (policy) {
  policy = (policy || 'none').toLowerCase();

  if (!_.contains(POLICIES, policy)) {
    throw new Error(util.format('Policy %s is not valid', policy));
  }

  return function *permittedCrossDomainPolicies(next) {
    this.set('X-Permitted-Cross-Domain-Policies', policy);
    yield next;
  };
};
