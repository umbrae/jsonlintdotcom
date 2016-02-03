# Contributing

To run this app locally you need:

- Fork & clone this repo
- Install NodeJS and NPM
- install Gulp globally
- Run ``npm install`` to install all dependencies
- Open **/index.html** with any webserver


After your changes you need to:

- Run ``gulp``
- Check is everything OK (**/dist/** is created and **/dist/index.html** works fine)
- Commit your changes
- Push & create pull request

To use **/proxy.php** you need to install ``php5-curl`` (and PHP of course)
```
sudo apt-get install php5-curl
```

## Useful Gulp tasks
- ``styles:watch`` runs PostCSS watcher
- ``default`` build everything (ready-to-deploy application goes to **/dist/** folder)

## Project structure
- **/postcss/** - CSS source files
- **/css/** - Compiled CSS files
- **/js/** - JavaScript files
- **/js/lib/** - Some JS libraries
- **/js/app/app.js** - The application
- **/img/** - Images
- **/proxy.php** - Proxy script for fetching external resources
- **/dist/** - Ready-to-deploy files (gitignored)
