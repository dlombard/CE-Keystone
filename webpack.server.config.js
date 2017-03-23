var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

const outputPath = path.resolve(__dirname)

module.exports = {
  entry: path.resolve(__dirname, 'keystone.js'),

  output: { path: outputPath, filename: 'server.bundle.js' },

  target: 'node',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  //  keep node_module paths out of the bundle
  externals: [
    fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat(['react-dom/server', 'react/addons']).
      reduce(
      (ext, mod) => {
        ext[mod] = `commonjs ${mod}`

        return ext
      }, {}),
    { winston: require("winston") }
  ],

  node: {
    __filename: false,
    __dirname: false
  },

  plugins: [
    // added this thing!
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }), new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
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
  ],
}

/*
var fs = require('fs')
var path = require('path')

module.exports = {

  entry: path.resolve(__dirname, 'keystone.js'),

  output: {
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),

  node: {
    __filename: false,
    __dirname: false
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

}
*/