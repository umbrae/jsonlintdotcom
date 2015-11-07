'use strict';

var PLUGIN_NAME = 'gulp-compass';
var path = require('path');
var spawn = require('child_process').spawn;
var gutil = require('gulp-util');
var path = require('path');
var helpers = require('./helpers');
var defaults = {
  style: false,
  comments: false,
  relative: true,
  css: 'css',
  sass: 'sass',
  image: false,
  generated_images_path: false,
  http_path: false,
  javascript: false,
  font: false,
  import_path: false,
  config_file: false,
  require: false,
  logging: true,
  load_all: false,
  project: process.cwd(),
  bundle_exec: false,
  debug: false,
  time: false,
  sourcemap: false,
  boring: false,
  force: false,
  task: 'compile'
};

module.exports = function(files, opts, callback) {
  if ('string' === typeof files) {
    files = [files];
  }

  opts = opts || {};

  var filePaths = [],
      pathsToCss = [];

  for (var key in defaults) {
    if (opts[key] === undefined) {
      opts[key] = defaults[key];
    }
  }

  files.forEach(function(file) {
    file = file.replace(/\\/g, '/');
    var relPathToSass = path.relative(path.resolve(opts.project, opts.sass), file);
    pathsToCss.push(path.resolve(opts.project, opts.css, gutil.replaceExtension(relPathToSass, '.css')));
    filePaths.push(file);
  });

  var compassExecutable = 'compass';

  // check command exist
  if (opts.bundle_exec) {
    compassExecutable = helpers.command('bundle', callback);
  } else {
    compassExecutable = helpers.command(compassExecutable, callback);
  }

  if (!compassExecutable) {
    return false;
  }

  var options = [];
  if (opts.bundle_exec) {
    options.push('exec', 'compass');
  }

  options.push(opts.task);
  if (process.platform === 'win32') {
    options.push(opts.project.replace(/\\/g, '/'));
  } else {
    options.push(opts.project);
  }

  if (opts.task !== 'watch') {
    filePaths.forEach(function(file) {
      options.push(file);
    });
  }

  // set compass setting
  if (opts.environment) { options.push('--environment', opts.environment); }

  if (opts.config_file) { options.push('-c', opts.config_file); }

  if (!opts.comments) { options.push('--no-line-comments'); }

  if (opts.relative) { options.push('--relative-assets'); }

  if (opts.debug) { options.push('--debug-info'); }

  if (opts.time) { options.push('--time'); }

  if (opts.boring) { options.push('--boring'); }

  if (opts.sourcemap) { options.push('--sourcemap'); }

  if (opts.font) { options.push('--fonts-dir', opts.font); }

  if (opts.style) { options.push('--output-style', opts.style); }

  if (opts.image) { options.push('--images-dir', opts.image); }

  if (opts.generated_images_path) { options.push('--generated-images-path', opts.generated_images_path); }

  if (opts.http_path) { options.push('--http-path', opts.http_path); }

  if (opts.javascript) { options.push('--javascripts-dir', opts.javascript); }

  if (opts.force) { options.push('--force'); }

  options.push('--css-dir', path.normalize(opts.css));
  options.push('--sass-dir', path.normalize(opts.sass));

  if (opts.import_path) {
    if (helpers.isArray(opts.import_path)) {
      opts.import_path.forEach(function(i) {
        options.push('-I', i);
      });
    } else {
      options.push('-I', opts.import_path);
    }
  }

  if (opts.load_all) { options.push('--load-all', opts.load_all); }

  if (opts.require) {
    if (helpers.isArray(opts.require)) {
      opts.require.forEach(function(f) {
        options.push('--require', f);
      });
    } else {
      options.push('--require', opts.require);
    }
  }

  if (opts.debug) {
    gutil.log(PLUGIN_NAME + ':', 'Running command:', compassExecutable, options.join(' '));
  }

  var child = spawn(compassExecutable, options, {cwd: opts.project || process.cwd()});
  var stdout = '';
  var stderr = '';

  if (opts.logging) {
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function(data) {
      stdout += data;
      console.log(data);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function(data) {
      stderr += data;
      if (!data.match(/^\u001b\[\d+m$/)) {
        gutil.log(data);
      }
    });
  }

  // support callback
  child.on('close', function(code) {
    if (callback) {
      callback(code, stdout, stderr, pathsToCss, opts);
    }
  });
};
