const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var webpack = require('webpack');

const PATHS = {
	app: path.resolve(__dirname,"src/index.jsx"),
  build: path.resolve(__dirname, "dist"),
};

module.exports = {
	// Entries have to resolve to files! They rely on Node
	//   // convention by default so if a directory contains *index.js*,
	//     // it resolves to that.
	entry: {
		app: PATHS.app,
  },
	output: {
		path: PATHS.build,
		// [name] will be replace for the name of the entry
    filename: "[name].[chunkhash].js",
    //publicPath: PATHS.public,
	},
  devServer: {
    contentBase: './dist',
    //contentBase: ['./dist', path.join(__dirname, 'public')],
		port: 9000
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: 'src/index.template.html',
     	filename: 'index.html',
  		inject: 'body',
      title: "Smilers",
    }),
    new CopyWebpackPlugin([
      {from:'public',to:'assets'} 
    ]), 
	],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
        ]
      },
      {
        test   : /\.scss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff|woff2)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/,
        use: [
          'file-loader'
        ]
      },
      {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
            plugins: [
              'transform-decorators-legacy',
            ],
             presets: ['es2015', 'react', 'stage-0', 'stage-3']
         },
         exclude: /node_modules/
       },
       {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-decorators-legacy',
          ],
          presets: ['es2015', 'react', 'stage-0', 'stage-3']
        }
      }
    ],
  
  },
  mode: 'development',
  target: 'web',
};
