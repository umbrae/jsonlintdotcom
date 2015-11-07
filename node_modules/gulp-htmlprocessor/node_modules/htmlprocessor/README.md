# htmlprocessor [![Build Status](https://travis-ci.org/dciccale/node-htmlprocessor.svg?branch=master)](https://travis-ci.org/dciccale/node-htmlprocessor) [![NPM version](https://badge.fury.io/js/htmlprocessor.png)](http://badge.fury.io/js/htmlprocessor)

`npm install -g htmlprocessor`

### Grunt task

This module is the processor behind [grunt-processhtml](http://github.com/dciccale/grunt-processhtml)

For plenty of documentation please visit [grunt-processhtml](http://github.com/dciccale/grunt-processhtml)

## CLI

```bash
$ htmlprocessor -v
```

Outputs to `file-to-process.processed.html`.

```bash
$ htmlprocessor file-to-process.html
```

Outputs to `processed/file.html`.

```bash
$ htmlprocessor file-to-process.html -o processed/file.html
```

Pass some data

```bash
$ htmlprocessor file-to-process.html -o processed/file.html -d data.json
```

Specify an environment

```bash
$ htmlprocessor file-to-process.html -o processed/file.html -e dev
```

Allow recursive processing

```bash
$ htmlprocessor file-to-process.html -o processed/file.html -r
```

Change the comment marker to `<!-- process --><!-- /process -->`

```bash
$ htmlprocessor file-to-process.html -o processed/file.html --comment-marker process
```

## New option

Create a list of files that were replaced and use that list to streamline the build process.

Note: This new option does not affect in any way the previous existing functionality (i.e. it's backward compatible).

```bash
$ htmlprocessor file-to-process.html -o processed/file.html --list wrk/replacement.list
```

Assumning you have this code in an HTML (or JSP)

```bash
        .
        .
        .
        <!-- build:css content/myApplication.min.css -->
        <link rel="stylesheet" href="js/bower_components/bootstrap/dist/css/bootstrap.css" />
        <link rel="stylesheet" href="content/bootstrap-responsive.min.css" needed />
        <link rel="stylesheet" href="js/bower_components/angular-date-range-picker/build/angular-date-range-picker.css" />
        <link rel="stylesheet" href="js/bower_components/angular-grid/ng-grid.css" />
        <link rel="stylesheet" href="content/styles.css" />
        <link rel="stylesheet" href="content/myApplicationStyles.css" />
        <link rel="stylesheet" href="content/angular-slider.css" />
        <!--/build-->
        .
        .
        .
        <!-- build:js js/myApplication.min.js -->
        <script src="js/bower_components/jquery/dist/jquery.js"></script>
        <script src="js/bower_components/angular/angular.js"></script>
        <script src="js/bower_components/angular-route/angular-route.js"></script>
        <script src="js/bower_components/angular-animate/angular-animate.js"></script>
        <script src="js/bower_components/angular-touch/angular-touch.js"></script>
        <script src="js/angular-slider.js"></script>
        <script src="js/bindonce.js"></script>
        <script src="js/bower_components/angular-cookies/angular-cookies.js"></script>
        <script src="js/bower_components/xdate/src/xdate.js"></script>
        <script src="js/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
        <script src="js/bower_components/angular-grid/build/ng-grid.js"></script>
        <script src="js/bower_components/angular-google-chart/ng-google-chart.js"></script>
        <script src="js/bower_components/clone/clone.js"></script>

        <!-- App libs -->
        <script src="app/app.js"></script>
        <script src="app/filters/filters.js"></script>
        <script src="app/services/services.js"></script>
        <script src="app/directives/various.js"></script>
        <script src="app/controllers/controllers.js"></script>
        <script src="app/controllers/settings.js"></script>
        <script src="app/controllers/time.js"></script>
        <script src="app/controllers/applications.js"></script>
        <!--/build-->
        .
        .
        .
```

The file "wrk/replacement.list" will contain something like this:

```bash
file-to-process.html:js/bower_components/bootstrap/dist/css/bootstrap.css
file-to-process.html:content/bootstrap-responsive.min.css
file-to-process.html:js/bower_components/angular-date-range-picker/build/angular-date-range-picker.css
file-to-process.html:js/bower_components/angular-grid/ng-grid.css
file-to-process.html:content/styles.css
file-to-process.html:content/myApplicationStyles.css
file-to-process.html:content/angular-slider.css
file-to-process.html:js/bower_components/jquery/dist/jquery.js
file-to-process.html:js/bower_components/angular/angular.js
file-to-process.html:js/bower_components/angular-route/angular-route.js
file-to-process.html:js/bower_components/angular-animate/angular-animate.js
file-to-process.html:js/bower_components/angular-touch/angular-touch.js
file-to-process.html:js/angular-slider.js
file-to-process.html:js/bindonce.js
file-to-process.html:js/bower_components/angular-cookies/angular-cookies.js
file-to-process.html:js/bower_components/xdate/src/xdate.js
file-to-process.html:js/bower_components/angular-bootstrap/ui-bootstrap-tpls.js
file-to-process.html:js/bower_components/angular-grid/build/ng-grid.js
file-to-process.html:js/bower_components/angular-google-chart/ng-google-chart.js
file-to-process.html:js/bower_components/clone/clone.js
file-to-process.html:app/app.js
file-to-process.html:app/filters/filters.js
file-to-process.html:app/services/services.js
file-to-process.html:app/directives/various.js
file-to-process.html:app/controllers/controllers.js
file-to-process.html:app/controllers/settings.js
file-to-process.html:app/controllers/time.js
file-to-process.html:app/controllers/applications.js
```

And you can use these commands to concatenate and eventually minify without having to update the build to tell
it where it should pickup each files. Also, in this way it orders the global file content in the same manner
as your individual includes originally were.

```bash
bash -c "cat `cat wrk/replacement.list | grep '\.js$' | cut -d: -f2` > dist/js/myApplication.js"
bash -c "cat `cat wrk/replacement.list | grep '\.css$' | cut -d: -f2` > dist/css/myApplication.css"
```

If you processed more than a single "html" file, you can change the grep like this:

```bash
... | grep 'file-to-process.html:.*\.js$' | ... > dist/js/myApplication.js
... | grep 'other-file-to-process.html:.*\.js$' | ... > dist/js/myApplicationOther.js
```

The originating file name is included in the list file for that very purpose.

## License
See [LICENSE.txt](https://raw.github.com/dciccale/node-htmlprocessor/master/LICENSE-MIT)
