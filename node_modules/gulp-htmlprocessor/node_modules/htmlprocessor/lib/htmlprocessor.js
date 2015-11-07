/*
 * node-htmlprocessor
 * https://github.com/dciccale/node-htmlprocessor
 *
 * Copyright (c) 2013-2014 Denis Ciccale (@tdecs)
 * Licensed under the MIT license.
 * https://github.com/dciccale/node-htmlprocessor/blob/master/LICENSE-MIT
 */

'use strict';

var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var blockTypes = require('./blocktypes');
var listFile = null;

var getBlocks = function (content, marker, filepath) {
  /*
   * <!-- build:<type>[:target] [value] -->
   * - type (required) js, css, attr, remove, template, include
   * - target|attribute (optional) i.e. dev, prod, release or attributes like [href] [src]
   * - value (optional) i.e. script.min.js
  */
  var regStart = new RegExp('<!--\\s*' + marker + ':(\\[?[\\w-]+\\]?)(?::([\\w,]+))?(?:\\s*(inline)\\s)?(?:\\s*([^\\s]+)\\s*-->)*');

  // <!-- /build -->
  var regEnd = new RegExp('(?:<!--\\s*)*\\/' + marker + '\\s*-->');

  // <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css/bootstrap.css" />
  var cssHref = new RegExp('^\\s*<\\s*\\LINK.*HREF=["' + "'" + ']([^"' + "'" + ']*)["' + "'" + '].*$', 'i');

  // <script src="js/bower_components/xdate/src/xdate.js"></script>
  var jsSrc = new RegExp('^\\s*<\\s*\\SCRIPT.*SRC=["' + "'" + ']([^"' + "'" + ']*)["' + "'" + '].*$', 'i');

  // Normalize line endings and split in lines
  var lines = content.replace(/\r\n/g, '\n').split(/\n/);
  var inside = false;
  var sections = [];
  var block;

  lines.forEach(function (line) {
    var build = line.match(regStart);
    var endbuild = regEnd.test(line);
    var attr;

    if (build) {
      inside = true;
      attr = build[1].match(/(?:\[([\w\-]+)\])*/)[1];
      block = {
        type: attr ? 'attr': build[1],
        attr: attr,
        targets: !!build[2] ? build[2].split(',') : null,
        inline: !!build[3],
        asset: build[4],
        indent: /^\s*/.exec(line)[0],
        raw: []
      };
    }

    if (inside && block) {
      block.raw.push(line);
      if (listFile) {
        var match = line.match(cssHref);
        if (match != null) {
          //call the write option where you need to append new data
          listFile.write(filepath + ":" + match[1] + "\n");
        }
        else {
          match = line.match(jsSrc);
          if (match != null) {
            listFile.write(filepath + ":" + match[1] + "\n");
          }
        }
      }
    }

    if (inside && endbuild) {
      inside = false;
      sections.push(block);
    }
  });

  return sections;
};

// The processor
var HTMLProcessor = function (options) {
  var defaults = {
    data: {},
    environment: '',
    templateSettings: null,
    includeBase: null,
    commentMarker: 'build',
    strip: false,
    recursive: false,
    customBlockTypes: []
  };

  this.options = utils._.extend({}, defaults, options);
  this.data = utils._.extend({}, this.options.data, {environment: this.options.environment});

  // Register custom block types
  if (this.options.customBlockTypes.length) {
    this.options.customBlockTypes.forEach(function (processor) {
      require(path.resolve(processor)).call(this, this);

    }, this);
  }
};

HTMLProcessor.prototype._blockTypes = blockTypes;

HTMLProcessor.prototype.registerBlockType = function (name, fn) {
  this._blockTypes[name] = fn;
};

// Returns a single line of the current block comment
HTMLProcessor.prototype._getBlockLine = function (block) {
  return block.raw.join(this.linefeed);
};

// Returns the block content (not including the build comments)
HTMLProcessor.prototype._getBlockContent = function (block) {
  return block.raw.slice(1, -1).join(this.linefeed);
};

// Replace passed block with the processed content
HTMLProcessor.prototype._replace = function (block, content, filepath) {
  var blockLine = this._getBlockLine(block);
  var blockContent = this._getBlockContent(block);
  var result = this._blockTypes[block.type].call(this, content, block, blockLine, blockContent,
      filepath);

  return result;
};

// Strips blocks not matched for the current environment
HTMLProcessor.prototype._strip = function (block, content) {
  var blockLine = this._getBlockLine(block);
  var blockContent = this._getBlockContent(block);
  var result = content.split(blockLine).join(blockContent);

  return result;
};

HTMLProcessor.prototype._replaceBlocks = function (blocks, filepath) {
  var result = this.content;

  // Replace found blocks
  utils._.each(blocks, function (block) {

    // Parse through correct block type checking the build environment
    if (this._blockTypes[block.type] && (!block.targets ||
        utils._.indexOf(block.targets, this.options.environment) >= 0) || (!this.options.strip && !this.options.environment)) {
      result = this._replace(block, result, filepath);
    } else if (this.options.strip) {
      result = this._strip(block, result, filepath);
    }
  }, this);

  return result;
};

// Process the file content
HTMLProcessor.prototype.process = function (filepath) {
  return this.processContent(fs.readFileSync(filepath).toString(), filepath);
};

// Process the input content
HTMLProcessor.prototype.processContent = function (content, filepath) {
  this.content = content;
  this.linefeed = /\r\n/g.test(this.content) ? '\r\n' : '\n';

  if (this.options && this.options.list) {
    //Set our log file as a writestream variable with the 'a' flag
    listFile = fs.createWriteStream(this.options.list, {
      flags:    "a",
      encoding: "encoding",
      mode:    parseInt('744', 8)
    });
  }

  // Parse the file content to look for build comment blocks
  var blocks = getBlocks(this.content, this.options.commentMarker, filepath);

  // Replace found blocks
  content = this._replaceBlocks(blocks, filepath);

  return content;
};

HTMLProcessor.prototype.template = utils._.template;

// Export the processor
module.exports = HTMLProcessor;
