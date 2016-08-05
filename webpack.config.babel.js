/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import SplitByPathPlugin from 'webpack-split-by-path';
import path from 'path';

const { NODE_ENV } = process.env;
const entry = {
    app: []
};

const plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: (a, b) => {
            const order = ['manifest', 'vendor', 'app'];
            const nameA = a.names[0];
            const nameB = b.names[0];

            return order.indexOf(nameA) - order.indexOf(nameB);
        }
    }),
    new SplitByPathPlugin([{
        name: 'vendor',
        path: path.join(__dirname, 'node_modules/'),
    }])
];

if (NODE_ENV === 'development') {
    entry.app.push('webpack-dev-server/client?http://localhost:8101');
    plugins.push(new OpenBrowserPlugin({
        url: 'http://localhost:8101',
        ignoreErrors: true
    }));
}

let filename;
let chunkFilename;

if (NODE_ENV === 'development') {
    filename = 'js/[name].js';
    chunkFilename = 'static/js/[id].[name].chunk.js';
} else {
    filename = 'js/[name]-[chunkhash].js';
    chunkFilename = 'js/[id]-[chunkhash].[name].chunk.js';
}

entry.app.push(
    'babel-polyfill',
    './js/index'
);

plugins.push(new CopyWebpackPlugin([
	{ from: 'css', to: 'css' },
    { from: 'img', to: 'img' },
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
        filename,
        chunkFilename,
        path: path.resolve('dist/'),
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
