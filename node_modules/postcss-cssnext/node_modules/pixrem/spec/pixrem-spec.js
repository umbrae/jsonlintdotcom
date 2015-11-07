// Jasmine unit tests
// To run tests, run these commands from the project root:
// 1. `npm install -g jasmine-node`
// 2. `jasmine-node spec`

'use strict';
var fs      = require('fs');
var pixrem  = require('../lib/pixrem');
var postcss = require('postcss');

var css = '.rule { font-size: 2rem }';

describe('pixrem', function () {

  it('should generate fallbacks using default settings', function () {
    var expected = '.rule { font-size: 32px; font-size: 2rem }';
    var processed = pixrem.process(css);

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a pixel root em value', function () {
    var expected = '.rule { font-size: 40px; font-size: 2rem }';
    var processed = pixrem.process(css, '20px');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a em root em value', function () {
    var expected = '.rule { font-size: 48px; font-size: 2rem }';
    var processed = pixrem.process(css, '1.5em');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a rem root em value', function () {
    var expected = '.rule { font-size: 56px; font-size: 2rem }';
    var processed = pixrem.process(css, '1.75rem');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a percent root em value', function () {
    var expected = '.rule { font-size: 48px; font-size: 2rem }';
    var processed = pixrem.process(css, '150%');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a unitless root em value', function () {
    var expected = '.rule { font-size: 36px; font-size: 2rem }';
    var processed = pixrem.process(css, '18');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a vw root em value', function () {
    var expected = '.rule { font-size: 32px; font-size: 2rem }';
    var processed = pixrem.process(css, '.625vw');

    expect(processed).toBe(expected);
  });

  it('should generate fallbacks with a value starting with dot', function () {
    var expected = '.rule { font-size: 16px; font-size: 2rem }';
    var processed = pixrem.process(css, '.5em');

    expect(processed).toBe(expected);
  });

  it('should replace rules with fallbacks when option.replace is true', function () {
    var expected = '.rule { font-size: 40px }';
    var processed = pixrem.process(css, '20px', { replace: true });

    expect(processed).toBe(expected);
  });

  it('should generate integer fallbacks, rounded down', function () {
    var expected = '.rule { font-size: 49px; font-size: 2rem }';
    var processed = pixrem.process(css, '155%');

    expect(processed).toBe(expected);
  });

  it('should handle < 1 values and values without a leading 0', function () {
    var css = '.rule { margin: 0.5rem .5rem 0rem -2rem }';
    var expected = '.rule { margin: 8px 8px 0px -32px; margin: 0.5rem .5rem 0rem -2rem }';
    var processed = pixrem.process(css);

    expect(processed).toBe(expected);
  });

  it('should generate default fallback with an inline sourcemap', function () {
    var expected = '.rule { font-size: 32px; font-size: 2rem }\n/*# sourceMappingURL=whatever.css.map */';
    var processed = pixrem.process(css, undefined, {}, {
      map: { 'inline': false },
      to: 'whatever.css'
    });
    expect(processed).toBe(expected);
  });

  it('should not convert rem in at-rules', function () {
    var css = '@media screen { .rule { font-size: 2rem } } @keyframes name { from { font-size: 2rem } }';
    var processed = pixrem.process(css);
    expect(processed).toBe(css);
  });

  it('should convert rem in at-rules if options is true', function () {
    var css = '@media screen { .rule { font-size: 2rem } }';
    var expected = '@media screen { .rule { font-size: 32px; font-size: 2rem } }';
    var processed = pixrem.process(css, undefined, { atrules: true });
    expect(processed).toBe(expected);
  });

  it('should convert rem in at-rules for IE9 hacks', function () {
    var css = '@media screen { .rule { font-size: 2rem } .rule::after { font-size: 2rem } }';
    var expected = '@media screen { .rule { font-size: 2rem } .rule::after { font-size: 32px; font-size: 2rem } }';
    var processed = pixrem.process(css, undefined, {browsers: 'ie 9'});
    expect(processed).toBe(expected);
  });

  it('should not convert rem in nested at-rules', function () {
    var css = '@media screen { .rule { font-size: 2rem } @media screen { .rule { font-size: 2rem } @media screen { .rule { font-size: 2rem } } } }';
    var processed = pixrem.process(css);
    expect(processed).toBe(css);
  });

  it('should not convert rem in unsupported feature (value)', function () {
    var css = '.rule { width: calc(100% - 2rem); background: linear-gradient(red 2rem, blue) }';
    var processed = pixrem.process(css);
    expect(processed).toBe(css);
  });

  it('should not convert rem in unsupported feature (property)', function () {
    var css = '.rule { transform: translate(2rem) }';
    var processed = pixrem.process(css);
    expect(processed).toBe(css);
  });

  it('should not convert rem in unsupported feature (with prefixes)', function () {
    var css = '.rule { width: -webkit-calc(100% - 2rem); width: calc(100% - 2rem); -ms-transform: translate(2rem) }';
    var processed = pixrem.process(css);
    expect(processed).toBe(css);
  });

  it('should use default root font-size as defined in CSS', function () {
    var css = 'html { font-size: 62.5% } .rule { font-size: 2rem; }';
    var expected = 'html { font-size: 62.5% } .rule { font-size: 20px; font-size: 2rem; }';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);

    css = '.rule { font-size: 2rem; } :root { font: italic 100 20px/24px sans-serif }';
    expected = '.rule { font-size: 40px; font-size: 2rem; } :root { font: italic 100 20px/24px sans-serif }';
    processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should detect root font-size only if targeted', function () {
    var css = ':root a { font-size: 10px } .rule { font-size: 2rem; }';
    var expected = ':root a { font-size: 10px } .rule { font-size: 32px; font-size: 2rem; }';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should use root font-size defined with calc', function () {
    var css = 'html { font-size: calc(.625em * 1) } .rule { font-size: 2rem; }';
    var expected = 'html { font-size: calc(.625em * 1) } .rule { font-size: 20px; font-size: 2rem; }';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should not use root font-size in MQ', function () {
    var css = 'html { font-size: 10px } @media screen { html { font-size: 20px } } .rule { font-size: 2rem; }';
    var expected = 'html { font-size: 10px } @media screen { html { font-size: 20px } } .rule { font-size: 20px; font-size: 2rem; }';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should run through font shorthand without root size', function () {
    var css = 'html { font: inherit } .rule { font-size: 2rem; }';
    var expected = 'html { font: inherit } .rule { font-size: 32px; font-size: 2rem; }';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should not use root font-size when option is set', function () {
    var css = 'html { font-size: 10px } .rule { font-size: 2rem; }';
    var expected = 'html { font-size: 10px } .rule { font-size: 32px; font-size: 2rem; }';
    var processed = pixrem.process(css, '16px', {html: false});
    expect(processed).toBe(expected);
  });

  it('should throw error when root font-size is invalid', function () {
    var css = 'html { font-size: calc(1em + 2px) } .rule { font-size: 2rem; }';
    var processed = function () {
      return pixrem.process(css);
    };
    expect(processed).toThrow('Root font-size is invalid');
  });

  it('should expose postcss processor', function () {
    var expected = postcss().use(pixrem).process('a { width: 2rem }').css;
    expect(expected).toBe('a { width: 32px; width: 2rem }');
  });

  it('should expose processor and allow options', function () {
    var expected = postcss().use(pixrem('10px', {replace: true})).process('a { width: 2rem }').css;
    expect(expected).toBe('a { width: 20px }');
  });

  it('should reduce line-breaks when inserting new node', function () {
    var css = '.rule{\n\tcolor:red;\n\n\tfont-size:2rem;\n}';
    var expected = '.rule{\n\tcolor:red;\n\n\tfont-size:32px;\n\tfont-size:2rem;\n}';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should reduce and keep windows line-breaks', function () {
    var css = '.rule{\r\n\tcolor:red;\r\n\r\n\tfont-size:2rem;\r\n}';
    var expected = '.rule{\r\n\tcolor:red;\r\n\r\n\tfont-size:32px;\r\n\tfont-size:2rem;\r\n}';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should reduce and keep linux line-breaks', function () {
    var css = '.rule{\r\tcolor:red;\r\r\tfont-size:2rem;\r}';
    var expected = '.rule{\r\tcolor:red;\r\r\tfont-size:32px;\r\tfont-size:2rem;\r}';
    var processed = pixrem.process(css);
    expect(processed).toBe(expected);
  });

  it('should not reduce line-breaks when replacing node', function () {
    var css = '.rule{\n\tcolor:red;\n\n\tfont-size:2rem;\n}';
    var expected = '.rule{\n\tcolor:red;\n\n\tfont-size:32px;\n}';
    var processed = pixrem.process(css, undefined, {replace: true});
    expect(processed).toBe(expected);
  });

  it('should not add fallback when IE8- are not in scope', function () {
    var css = '.rule{width: 2rem}';
    var expected = '.rule{width: 2rem}';
    var processed = pixrem.process(css, undefined, {browsers: 'firefox 28'});
    expect(processed).toBe(expected);
  });

  it('should add fallback when only IE8 is in scope', function () {
    var css = '.rule{width: 2rem}';
    var expected = '.rule{width: 32px;width: 2rem}';
    var processed = pixrem.process(css, undefined, {browsers: 'ie 8'});
    expect(processed).toBe(expected);
  });

  it('should add fallback when only IE6 is in scope', function () {
    var css = '.rule{width: 2rem}';
    var expected = '.rule{width: 32px;width: 2rem}';
    var processed = pixrem.process(css, undefined, {browsers: 'ie 6'});
    expect(processed).toBe(expected);
  });

  it('should add fallback only for font and pseudo-element when IE9 is in scope', function () {
    var css = '.rule{width: 2rem;font: bold 2rem sans-serif}.rule::after{width: 2rem}';
    var expected = '.rule{width: 2rem;font: bold 32px sans-serif;font: bold 2rem sans-serif}.rule::after{width: 32px;width: 2rem}';
    var processed = pixrem.process(css, undefined, {browsers: 'ie 9'});
    expect(processed).toBe(expected);
  });

});
