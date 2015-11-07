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
var url = require('url');

function obtainStyles(block, html, baseDir) {
  var hrefRegEx = /.*href=[\'"]([^\'"]*)[\'"].*/gi;

  return obtainAssets(hrefRegEx, block, html, baseDir);
}

function obtainScripts(block, html, baseDir) {
  var srcRegEx = /.*src=[\'"]([^\'"]*)[\'"].*/gi;

  return obtainAssets(srcRegEx, block, html, baseDir);
}

function obtainAssets(assetPathRegEx, block, html, baseDir) {
  var assetpath,
      fileContent,
      match,
      assets = [];

  if (block.asset) {
    assetpath = path.join(baseDir, block.asset);
    fileContent = fs.readFileSync(assetpath).toString();

    return [fileContent];
  }

  while ((match = assetPathRegEx.exec(html)) !== null) {
    assetpath = path.join(baseDir, match[1]);
    fileContent = fs.readFileSync(assetpath).toString();

    assets.push(fileContent);
  }

  return assets;
}

// Define default block types
module.exports = {
  css: function (content, block, blockLine, blockContent, filepath) {
    var replacement,
        styles = [];

    if (block.inline) {
      styles = obtainStyles(block, blockContent, this.options.includeBase || path.dirname(filepath));
      replacement = block.indent + '<style>' + this.linefeed +
                    styles.join(this.linefeed) +
                    block.indent + '</style>';

      return content.split(blockLine).join(replacement);
    }

    return content.replace(blockLine, block.indent + '<link rel="stylesheet" href="' + block.asset + '">');
  },

  js: function (content, block, blockLine, blockContent, filepath) {
    var replacement,
        scripts = [];

    if (block.inline) {
      scripts = obtainScripts(block, blockContent, this.options.includeBase || path.dirname(filepath));
      replacement = block.indent + '<script>' + this.linefeed +
                    scripts.join(this.linefeed) +
                    block.indent + '</script>';

      return content.split(blockLine).join(replacement);
    }

    return content.replace(blockLine, block.indent + '<script src="' + block.asset + '"><\/script>');
  },

  attr: function (content, block, blockLine, blockContent) {
    var re = new RegExp('(.*' + block.attr + '=[\'"])([^\'"]*)([\'"].*)', 'gi');
    var replaced = false;

    // Only run attr replacer for the block content
    var replacedBlock = blockContent.replace(re, function (wholeMatch, start, asset, end) {

      // Check if only the path was provided to leave the original asset name intact
      asset = (!path.extname(block.asset) && /\//.test(block.asset)) ? url.resolve(block.asset, path.basename(asset)) : block.asset;

      replaced = true;

      return start + asset + end;
    });

    // If the attribute doesn't exist, add it.
    if (!replaced) {
      replacedBlock = blockContent.replace(/>/, ' ' + block.attr + '="' + block.asset + '">');
    }

    return content.replace(blockLine, replacedBlock);
  },

  remove: function (content, block, blockLine, blockContent) {
    // Replace blockLine with surrounding new line symbols with empty string
    return content.split(this.linefeed + blockLine + this.linefeed).join('');
  },

  template: function (content, block, blockLine, blockContent) {
    var compiledTmpl = utils._.template(blockContent, this.data, this.options.templateSettings);

    // Clean template output and fix indent
    compiledTmpl = block.indent + compiledTmpl.trim().replace(/(\r\n|\n)\s*/g, '$1' + block.indent);

    return content.replace(blockLine, compiledTmpl.replace(/\$/g, '$$$'));
  },

  include: function (content, block, blockLine, blockContent, filepath) {
    var base = this.options.includeBase || path.dirname(filepath);
    var assetpath = path.join(base, block.asset);
    var l = blockLine.length;
    var fileContent, i;

    if (fs.existsSync(assetpath)) {

      // Recursively process included files
      if (this.options.recursive) {
        fileContent = this.process(assetpath);

      } else {
        fileContent = fs.readFileSync(assetpath).toString();
      }

      // Add indentation and remove any last new line
      fileContent = block.indent + fileContent.replace(/(\r\n|\n)$/, '');

      while ((i = content.indexOf(blockLine)) !== -1) {
        content = content.substring(0, i) + fileContent + content.substring(i + l);
      }
    }

    return content;
  }
};
