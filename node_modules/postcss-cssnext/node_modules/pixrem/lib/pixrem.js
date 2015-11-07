'use strict';
var calc         = require('reduce-css-calc');
var postcss      = require('postcss');
var browserslist = require('browserslist');

var _remgex, _PROPS, _VALUES, _rootvalue, _options;
var BASE_FONT_SIZE = 16;


// Add pixel fallbacks for rem units to a string of CSS
// - css `String`: the contents of a CSS file.
// - rootvalue `String | Null`: The root element font size. Default = 16px.
// - options `Object`
//     - replace `Boolean`: Replace rems with pixels instead of providing
//       fallbacks. Default = false.
//     - atrules `Boolean`: Replace rems in at-rules too. Default = false

function Pixrem (rootvalue, options) {
  _remgex = /(\d*\.?\d+)rem/ig;
  _PROPS  = /^(background-size|border-image|border-radius|box-shadow|clip-path|column|grid|mask|object|perspective|scroll|shape|size|stroke|transform)/;
  _VALUES = /(calc|gradient)\(/;
  _rootvalue = typeof rootvalue !== 'undefined' ? rootvalue : BASE_FONT_SIZE;
  options = options || {};
  _options = {};
  _options.replace  = (options.replace !== undefined) ? options.replace : false;
  _options.atrules  = (options.atrules !== undefined) ? options.atrules : false;
  _options.html     = (options.html !== undefined) ? options.html : true;
  _options.browsers = (options.browsers !== undefined) ? options.browsers : 'ie <= 8';
}

Pixrem.prototype.process = function (css, options) {
  return postcss(this.postcss).process(css, options).css;
};

Pixrem.prototype.postcss = function (css) {

  var vendor = require('postcss/lib/vendor');
  var browsers = browserslist(_options.browsers);

  // detect IE versions needed
  var isIElte8, isIEgte9, isIE9_10;
  if (detectBrowser(browsers, 'ie <= 8')) {
    isIElte8 = true;
  }
  if (detectBrowser(browsers, 'ie >= 9')) {
    isIEgte9 = true;
  }
  if (detectBrowser(browsers, 'ie 9, ie 10')) {
    isIE9_10 = true;
  }
  // no IE versions needed, skip
  if (!isIElte8 && !isIEgte9 && !isIE9_10) { return; }

  if (_options.html) {
    // First, check root font-size
    css.walkRules(function (rule) {
      if (rule.parent && rule.parent.type === 'atrule') { return; }
      if (/^(html|:root)$/.test(rule.selectors)) {
        rule.walkDecls(function (decl) {
          if (decl.prop === 'font-size') {
            _rootvalue = decl.value;
          } else if (decl.prop === 'font' && decl.value.match(/\d/)) {
            _rootvalue = decl.value.match(/.*?([\d\.]*(em|px|rem|%|pt|pc))/)[1];
          }
        });
      }
    });
  }

  //Then, for each rules
  css.walkRules(function (rule) {

    // if options.at-rules is false AND it's not IE9-10: skip @rules
    if (!_options.atrules && !isIE9_10) {
      if (rule.type === 'atrule' || (rule.parent && rule.parent.type === 'atrule')) { return; }
    }

    var isPseudoElement = (rule.selector.search(/:(after|before)/gi) !== -1);

    rule.each(function (decl, i) {

      if (decl.type !== 'decl') { return; }

      var value = decl.value;

      if (value.indexOf('rem') !== -1) {

        var prop = vendor.unprefixed(decl.prop);
        // replace rems only if needed
        var isFontShorthand = (prop === 'font');
        var isSpecialCaseIE9_10 = (isIE9_10 && (isPseudoElement || isFontShorthand));
        var isUseless = (!isIE9_10 && !(_VALUES.test(value) || _PROPS.test(prop)));

        if ( isSpecialCaseIE9_10 || isUseless ) {

          value = value.replace(_remgex, function ($1) {
            // Round decimal pixels down to match webkit and opera behavior:
            // http://tylertate.com/blog/2012/01/05/subpixel-rounding.html
            return Math.floor(parseFloat($1) * toPx(_rootvalue)) + 'px';
          });

          if (_options.replace) {
            decl.value = value;
          } else {
            var clone = decl.clone({ value: value });
            if (decl.raws.before) {
              clone.raws.before = decl.raws.before;
              decl.raws.before = reduceLineBreaks(decl.raws.before);
            }
            rule.insertBefore(i, clone);
          }

        }

      }

    });

  });

};

// Detect if one browser from the browserQuery is in browsers
function detectBrowser (browsers, browserQuery) {
  var b = false;
  browserQuery = browserslist(browserQuery);
  for (var i = 0; i < browsers.length; i++) {
    for (var j = 0; j < browserQuery.length; j++) {
      if (browsers[i] === browserQuery[j]) {
        b = true;
        break;
      }
    }
    if (b) { break; }
  }
  return b;
}

// Reduce line breaks
function reduceLineBreaks (value) {
  return value.replace(/(\r*\n|\r)+/g, '$1');
}

// Return a unitless pixel value from any root font-size value.
function toPx (value) {
  value = (typeof value === 'string' && value.indexOf('calc(') !== -1) ? calc(value) : value;
  var parts = /^(\d*\.?\d+)([a-zA-Z%]*)$/.exec(value);
  if (parts !== null) {
    var number = parts[1];
    var unit   = parts[2];

    if (unit === 'px' || unit === '') {
      return parseFloat(number);
    }
    else if (unit === 'em' || unit === 'rem') {
      return parseFloat(number) * BASE_FONT_SIZE;
    }
    else if (unit === '%') {
      return (parseFloat(number) / 100) * BASE_FONT_SIZE;
    } else {
      // other units: vw, ex, ch, etc...
      return BASE_FONT_SIZE;
    }
  } else {
    throw new Error('Root font-size is invalid');
  }
}

var pixrem = function (rootvalue, options) {
  return new Pixrem(rootvalue, options);
};
pixrem.process = function (css, rootvalue, options, postcssoptions) {
  return new Pixrem(rootvalue, options).process(css, postcssoptions);
};
pixrem.postcss = function (css) {
  return new Pixrem().postcss(css);
};

module.exports = pixrem;
