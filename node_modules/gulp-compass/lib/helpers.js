'use strict';

var which = require('which').sync;

module.exports.isArray = function(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

module.exports.command = function(cmd, callback) {
  var command;

  try {
    command = which(cmd);
  } catch (err) {

    if (callback) {
      callback(127, '', String(err), '');
    }

    return false;
  }

  return command;
};
