var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  
});


module.exports = {
  entry: ['./src/main.ts','./src/style/main.scss'],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'release'),
      sourceMapFilename: "[file].map", // string

  },
  

  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.js','.scss'],
    modules:['node_modules','bower_components'],
  },

   externals: {
    jquery: 'jQuery',
    backbone:'Backbone',
    underscore:'_'
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  module: {
    // loaders: [
     
      
    //   // { test: /\.tplt$/,
    //   //   use:[{
    //   //     loader: path.resolve('webpack/tplt-ts-loader.js'),
    //   //     options: {}
    //   //   }]
    //   // },
    // ],
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.tplt\.html$/, loader: 'raw-loader' },
      { test: /\.ejs$/, loader: 'ejs-html-loader' },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: [path.resolve(__dirname,"src/style/main.scss")]
              }
          }],
          
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/index.html'),
      inject: true,
      title: 'My App',
      filename: 'index.html'
    }),
    extractSass
  ],




};
