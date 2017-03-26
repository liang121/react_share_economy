// var path = require("path");

// var DIST_DIR = path.resolve(__dirname, "dist");
// var SRC_DIR = path.resolve(__dirname, "client");

// var config = {
//     entry: SRC_DIR + "/app/index.js",
//     output: {
//         path: DIST_DIR + "/app",
//         filename: "bundle.js",
//         publicPath: "/app/"
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js?/,
//                 include: SRC_DIR,
//                 loader: "babel-loader",
//                 query: {
//                     presets: ["react", "es2015", "stage-2"]
//                 }
//             },
//             { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
//             { test: /\.js$/, loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})]
//             , exclude: /node_modules/ }

//         ]
//     }
// };

// module.exports = config;

var path = require("path");
var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/)

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      './client/app/index.js',
    ],
  },
  output: {
    //path: path.resolve(__dirname, "build"),
    publicPath: "/app/",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ],
  },
  plugins: [ignore],
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8081',
    },
  },
};