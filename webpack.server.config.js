var fs = require('fs')
var path = require('path')

const outputPath = path.resolve(__dirname)
console.log(`OUTPUT PATH: ${outputPath}`)
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