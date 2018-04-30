'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './client/src/app.js',
    dashboard: './client/src/dashboard.js'
  },
  devServer: {
    hot: true
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['absolute/path/a', 'absolute/path/b']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'client/index.html',
      template: 'client/index.html',
      chunks: ['app'],
      inject: true
    }),

    new HtmlWebpackPlugin({
      filename: 'client/dashboard.html',
      template: 'client/dashboard.html',
      chunks: ['dashboard'],
      inject: true
    })
  ]
};
