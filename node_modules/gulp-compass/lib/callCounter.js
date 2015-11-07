'use strict';

module.exports = function(pendingResponses, cb) {
  var fire = function() {
    cb();
    cb = function() {};
  };

  if (pendingResponses < 1) {
    fire();
  }

  return function() {
    if (--pendingResponses <= 0) {
      fire();
    }
  };
};
