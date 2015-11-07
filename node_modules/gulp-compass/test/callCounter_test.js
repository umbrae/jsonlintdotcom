'use strict';
var callCounter = require('../lib/callCounter');

require('mocha');
require('should');

describe('callCounter', function() {
  it('calls the callback when no calls are expected', function() {
    var called = 0;
    callCounter(0, function(){ called++; });
    called.should.eql(1);
  });

  it('calls the callback when the count is reached', function() {
    var called = 0;
    var counter = callCounter(3, function(){ called++; });
    called.should.eql(0);
    counter();
    called.should.eql(0);
    counter();
    called.should.eql(0);
    counter();
    called.should.eql(1);
  });

  it('does not call the callback again if the limit is passed', function() {
    var called = 0;
    var counter = callCounter(1, function(){ called++; });
    called.should.eql(0);
    counter();
    called.should.eql(1);
    counter();
    called.should.eql(1);
  });

  it('does not call the callback again if the 0 limit is passed', function() {
    var called = 0;
    var counter = callCounter(0, function(){ called++; });
    called.should.eql(1);
    counter();
    called.should.eql(1);
  });
});
