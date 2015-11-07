/*
 * node-htmlprocessor
 * https://github.com/dciccale/node-htmlprocessor
 *
 * Copyright (c) 2013-2014 Denis Ciccale (@tdecs)
 * Licensed under the MIT license.
 * https://github.com/dciccale/node-htmlprocessor/blob/master/LICENSE-MIT
 */

'use strict';

var path = require('path');
var fs = require('fs');
var HTMLProcessor = require('./lib/htmlprocessor');
var utils = require('./lib/utils');

module.exports = function (files, options) {

  if (options && options.customBlockTypes && options.customBlockTypes.length) {
    options.customBlockTypes = options.customBlockTypes.map(function (processor) {
      return path.resolve(processor);
    });
  }

  var html = new HTMLProcessor(options);

  var getOutputPath = function (filepath) {
    var dest = files.dest;
    var ext;

    if (!dest) {
      ext = path.extname(filepath);
      dest = path.basename(filepath, ext) + '.processed' + ext;
    } else if (!path.extname(dest)) {
      dest = path.join(dest, filepath);
    }

    return dest;
  };

  // create output directory if needed
  if (files.dest) {
    if (path.extname(files.dest)) {
      utils.mkdir(path.dirname(files.dest));
    } else {
      utils.mkdir(files.dest);
    }
  }

  // create options.list directory if needed
  if (options && options.list) {
    utils.mkdir(path.dirname(options.list));
  }

  files.src.forEach(function (filepath) {
    var content = html.process(filepath);
    var dest = getOutputPath(filepath);

    fs.writeFileSync(dest, content);
    console.log('File', '"' + dest + '"', 'created.');
    if (options && options.list) {
      console.log('File', '"' + options.list + '"', 'created.');
    }
  });
};
