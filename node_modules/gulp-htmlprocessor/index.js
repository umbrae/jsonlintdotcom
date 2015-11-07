'use strict';

var gutil = require('gulp-util'),
    through = require('through2'),
    HTMLProcessor = require('htmlprocessor');

var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-htmlprocessor';

module.exports = function(options) {

    var processor = new HTMLProcessor(options);

    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            var content = processor.processContent(file.contents.toString(enc), file.path);

            if (options && options.process) {
                content = processor.template(content, processor.data, options.templateSettings);
            }

            file.contents = new Buffer(content, enc);
        }

        this.push(file);

        cb();
    });

};