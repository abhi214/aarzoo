// See: http://webpack.github.io/docs/configuration.html
const path = require('path');

module.exports = {
  entry: {
    aarzoo: './client/aarzoo.jsx',
  },
  output: {
    path: path.resolve('./aarzoo_client'),
    filename: '[name].js',
    publicPath: '/webpack'  // See bin/serve.js webpack-dev-middleware
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/i,
        loader: 'babel',
        exclude: [
          /node_modules/
        ],
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader:'style-loader!css-loader?sourceMap'
      }
    ]
  }
};
