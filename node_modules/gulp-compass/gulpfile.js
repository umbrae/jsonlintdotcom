'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var lib = ['**/*.js', '!test/**/*', '!node_modules/**/*', '!coverage/**/*'];

function mochaStream() {
  return gulp.src('test/*_test.js', {read: false})
    .pipe($.mocha({
      reporter: 'spec'
    }));
}

gulp.task('coverage', ['clean'], function() {
  return gulp.src(lib)
    .pipe($.istanbul())
    .pipe($.istanbul.hookRequire());
});

gulp.task('jscs', function() {
  return gulp.src(lib)
    .pipe($.jscs());
});

gulp.task('jshint', function() {
  return gulp.src(lib)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-reporter-jscs'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('mocha', ['coverage'], function() {
  return mochaStream()
    .pipe($.istanbul.writeReports());
});

gulp.task('mocha:nocov', function() {
  return mochaStream();
});

gulp.task('clean', del.bind(null, ['test/css', 'coverage/**/*']));

gulp.task('default', ['mocha', 'jshint']);
