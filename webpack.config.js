var webpack = require('webpack')

module.exports = {
    entry: {
        'bundle': './lib/app/index.js',
        'bundle.min': './lib/app/index.js',
    },

    output: {
        path: 'public',
        filename: '/js/[name].js',
        publicPath: '/'
    },

    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            }
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
