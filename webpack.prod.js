const path = require('path');
const base = require('./webpack.base');
const merge = require('webpack-merge');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const purgecss = require('@fullhuman/postcss-purgecss');

const pages = fs.readdirSync(path.resolve(__dirname, 'src')).filter((fileName) => fileName.endsWith('.html'));

module.exports = merge(base, {
  entry: [ '@babel/polyfill', './src/index.js' ],
  mode: 'production',
  output: {
    filename: 'bundle-[contentHash].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      ...pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            template: `src/${page}`,
            filename: page,
            minify: {
              removeComments: true,
              collapseWhitespace: true
            }
          })
      )
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main-[contentHash].css'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('tailwindcss'),
                purgecss({
                  content: [ './src/*.html' ],
                  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                  //exclude all classes that are being added dynamically with JavaScript
                  whitelist: []
                }),
                require('autoprefixer'),
                require('cssnano')({
                  preset: 'default'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  }
});
