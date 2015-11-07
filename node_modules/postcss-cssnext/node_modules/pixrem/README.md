# Pixrem

[![Build Status](https://travis-ci.org/robwierzbowski/node-pixrem.png?branch=master)](https://travis-ci.org/robwierzbowski/node-pixrem)

A CSS post-processor that generates pixel fallbacks for rem units.  
Written with [PostCSS](https://github.com/ai/postcss).  
Add it to your build process with [grunt-pixrem](https://github.com/robwierzbowski/grunt-pixrem).  

## Installation

`npm install --save pixrem`

## Usage

Pixrem is a CSS post-processor that, given CSS and a root em value, returns CSS with pixel unit fallbacks or replacements. It's based on [browser data](http://caniuse.com/rem) so only needed fallbacks will be added. Basically, it's for IE8 or less, and for IE9 & IE10 in the `font` shorthand property and in pseudo-elements.

### Example

```js
'use strict';
var fs = require('fs');
var pixrem = require('pixrem');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = pixrem.process(css, '200%');

fs.writeFile('main.with-fallbacks.css', processedCss, function (err) {
  if (err) {
    throw err;
  }
  console.log('IE8, you\'re welcome.');
});
```

Pixrem takes this:

```css
.sky {
  margin: 2.5rem 2px 3em 100%;
  color: blue;
}

@media screen and (min-width: 20rem) {
  .leaf {
    margin-bottom: 1.333rem;
    font-size: 1.5rem;
  }
}
```

And returns this:

```css
.sky {
  margin: 80px 2px 3em 100%;
  margin: 2.5rem 2px 3em 100%;
  color: blue;
}

@media screen and (min-width: 20rem) {
  .leaf {
    margin-bottom: 1.333rem;
    font-size: 1.5rem;
  }
}
```

### Parameters

#### css

Type: `String`  

Some CSS to process.

#### rootvalue

Type: `String | Null`  
Default: `16px`  

The root element font size. Can be `px`, `rem`, `em`, `%`, or unitless pixel value. Pixrem also tries to get the root font-size from CSS (`html` or `:root`) and overrides this option. You can use `html` option to disable it in case you need it.

#### options

Type: `Object | Null`
Default: `{ replace: false, atrules: false, html: true, browsers: 'ie <= 8' }`

- `replace`  replaces rules containing `rem`s instead of adding fallbacks.
- `atrules`  generates fallback in at-rules too (media-queries)
- `html`     overrides root font-size from CSS `html {}` or `:root {}`
- `browsers` sets browser's range you want to target, based on [browserslist](https://github.com/ai/browserslist)

## Contribute

Report bugs and feature proposals in the [Github issue tracker](https://github.com/robwierzbowski/node-pixrem/issues). Run tests with jasmine-node. In lieu of a formal styleguide, take care to maintain the existing coding style. 

## Release History

2.0.1, Sep 17, 2015

* Fix NaNpx values (#45)

2.0.0, Aug 24, 2015

* Update to PostCSS 5.0

1.3.2, Aug 24, 2015

* Unpublished version

1.3.1, Jul 9, 2015

* Fixed: Replace `eachDecl` with `each` and `decl.type` check in process function

1.3.0, Jul 1, 2015

* Added: Use browserslist to generate rem fallbacks only when needed

1.2.4, Apr 17, 2015

* Fixed: generate fallbacks with a value starting with dot

1.2.3, Mar 27, 2015

* Fix: copy and reduce decl.before, only if defined

1.2.2, Mar 27, 2015

* Fix root-font size detection

1.2.1, Mar 23, 2015

* Reduce line-breaks when inserting clone node

1.2.0, Feb 19, 2015

* Add option `html` to disable root font-size detection
* Fix root-font size defined with `calc`
* Throw error when root font-size is invalid

1.1.1, Feb 5, 2015:

* Fix root font-size detection

1.1.0, Jan 25, 2015:

* PostCSS 4
* Expose postcss processor

1.0.0, Nov 26, 2014: 

* Generate rem fallbacks only when needed
* Updated to PostCSS v3.0
* Get root font-size from CSS

0.1.4, March 6, 2014: Code optimization from AI.  
0.1.3, Dec 14, 2013: Fix regex for < 0 values.  
0.1.1, 0.1.2, Dec 14, 2013: Documentation improvements.  
0.1.0, Dec 14, 2013: Initial release.  

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/robwierzbowski/node-pixrem/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

