# gulp-htmlprocessor

> Process html files at build time to modify them depending on the release environment

This project is a [Gulp](http://gulpjs.com/) implementation of [node-htmlprocessor](https://github.com/dciccale/node-htmlprocessor), which is the standalone library __of the [grunt-processhtml](https://github.com/dciccale/grunt-processhtml) plugin__.

## Status

Currently, as of v0.3.3 __every features__ of gulp-processhtml __are supported__.

### Differences

The only difference between the Grunt plugin and this Gulp plugin is the environment option, it must be set manually due to the lack of target management in Gulp.

## Usage

Be sure to have the latest version of Gulp:

```shell
npm install -g gulp
```

Install the plugin with this command:

```shell
npm install --save-dev gulp-htmlprocessor
```

The options and the HTML syntax are listed [in the original documentation](https://github.com/dciccale/grunt-processhtml#readme).

Now, you can process your HTML in your `gulpfile.js`:

```js
var gulp = require('gulp'),
    htmlprocessor = require('gulp-htmlprocessor');

var options = {
    // Pass your options here
};

gulp.task('default', function() {
    return gulp.src('src/*.html')
        .pipe(htmlprocessor(options))
        .pipe(gulp.dest('dist'));
});
```

## Test

To run the tests, just use the following command:

```shell
npm test
```