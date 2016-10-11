var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = [
  //configuration for the client
  {
    entry: './src/client.js',

    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
      chunkFilename: '[id].chunk.js',
      publicPath: '/'
    },

    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?presets[]=es2015&presets[]=react'
        }, {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
  },

  //configuration for the server-side rendering of routes
  {
    name: "server-side rendering",
    entry: './src/routes/RootRoute.js',
    target: "node",
    output: {
      path: path.join(__dirname, 'src'),
      filename: "server.routes.bundle.js",
      publicPath: './',
      libraryTarget: "commonjs2"
    },
    externals: /^[a-z\-0-9]+$/,
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
        { test: /\.scss$/, loader: 'ignore-loader'}
      ]
    }
  }
]
