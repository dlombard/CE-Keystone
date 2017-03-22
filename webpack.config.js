var webpack = require('webpack')

module.exports = {
    entry: './lib/app/index.js',

    output: {
        path: 'public',
        filename: '/js/bundle.js',
        publicPath: '/'
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
    ] : [new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    })],

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
}
