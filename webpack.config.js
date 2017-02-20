var path = require('path');
var webpack = require('webpack');
//var LoDashModuleLoader= require('loader/lodash-module-loader.js');

module.exports = {
  entry: './src/modbuseditor/editor.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'release'),
      sourceMapFilename: "[file].map", // string
      
  },
  resolve: {
    extensions: [ '.webpack.js', '.web.js', '.ts', '.js'],
    modules:['node_modules','bower_components']
    // ,
    // "plugins":[
    //     new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     Backbone:'backbone',
    //     _:'underscore'
    //    })
    //  ]

  },
 
   externals: {
    jquery: 'jQuery',
    backbone:'Backbone',
    underscore:'_'
  },
  // Enable sourcemaps for debugging webpack's output.
//  devtool: "source-map",
 
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader' }
  //    { test: /\.tplt\.html$/, loader: 'lodash-module-loader' }
    ]
  },
   


  
};
