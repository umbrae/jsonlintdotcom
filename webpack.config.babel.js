/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import path from 'path';

const { NODE_ENV } = process.env;
const entry = [];
const plugins = [];

if (NODE_ENV === 'development') {
    entry.push('webpack-dev-server/client?http://localhost:8101');
    plugins.push(new OpenBrowserPlugin({
        url: 'http://localhost:8101',
        ignoreErrors: true
    }));
}

entry.push('./js/index');
plugins.push(new CopyWebpackPlugin([
	{ from: 'css', to: 'css' },
    { from: 'img', to: 'img' },
	{ from: 'index.html' },
    { from: 'proxy.php' },
    { from: 'buysellads.php' },
    { from: 'include.php' },
    { from: 'favicon.ico' }
]));

module.exports = {
    entry,
    plugins,
    context: __dirname,
    output: {
        path: path.resolve('dist/'),
        filename: 'js/app.js',
        library: 'app',
        libraryTarget: 'var'
    },
    module: {
        loaders: [{
            test: /.js?$/,
            loaders: ['babel', 'eslint'],
            include: path.resolve('js/')
        }]
    },
    devtool: 'source-map',
    eslint: {
        configFile: '.eslintrc.json'
    }
};
