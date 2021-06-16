/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { argv } from 'optimist';
import '@babel/polyfill';

const { NODE_ENV } = process.env;
const entry = {
    app: []
};

const plugins = [
    new HtmlWebpackPlugin({
        template: 'index.html',
    }),
    new MiniCssExtractPlugin({
        filename: 'css/style-1.css',
    }),
];

if (NODE_ENV === 'development') {
    const { port } = argv;

    entry.app.push(`webpack-dev-server/client?http://localhost:${port}`);
}

let filename;
let chunkFilename;

if (NODE_ENV === 'development') {
    filename = 'js/[name].js';
    chunkFilename = 'js/[id].[name].chunk.js';
} else {
    filename = 'js/[name]-[chunkhash].js';
    chunkFilename = 'js/[id]-[chunkhash].[name].chunk.js';
}

entry.app.push(
    '@babel/polyfill',
    './js/index',
);

plugins.push(new CopyWebpackPlugin({
    patterns: [
        { from: 'static', to: '.' },
    ]
}));

module.exports = {
    entry,
    plugins,
    context: __dirname,
    devServer: {
        open: true,
    },
    output: {
        filename,
        chunkFilename,
        path: path.resolve('dist/'),
        library: 'app',
        libraryTarget: 'var'
    },
    module: {
        rules: [{
            test: /.js?$/,
            use: ['babel-loader'],
            include: path.resolve('js/')
        }, {
            test: /\.css$/,
            use: [
                { loader: MiniCssExtractPlugin.loader },
                { loader: 'css-loader' }
            ]
        }]
    },
    devtool: 'source-map'
};
