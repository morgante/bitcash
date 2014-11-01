/*global describe,it*/
'use strict';
var assert = require('assert'),
  bitcash = require('../lib/bitcash.js');

describe('bitcash node module.', function() {
  it('must be awesome', function() {
    assert( bitcash .awesome(), 'awesome');
  });
});
