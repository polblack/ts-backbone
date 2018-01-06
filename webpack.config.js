var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
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
      
      { test: /\.ts$/, loader: 'awesome-typescript-loader' },
      { test: /\.tplt$/, 
        use:[{
          loader: path.resolve('webpack/tplt-ts-loader.js'),
          options: {}
        }]
      }
    ]
  },
   


  
};
