const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const src  = path.resolve(__dirname, 'src');
const pub  = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: src + '/index.js',

  output: {
    path: pub,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: pub,
    inline: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 3000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: pub + '/index.html',
      filename: 'index.html'
    }),
    new Dotenv()
  ]
};
