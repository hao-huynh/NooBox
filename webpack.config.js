const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/assets', to: 'static' },
      { from: './public' },
    ]),
  ],
  entry: {
    popup:['babel-polyfill',"./src/popup.js"],
    background:['babel-polyfill',"./src/background/index.js"],
    imageSearch:['babel-polyfill',"./src/imageSearch.js"],
  },
  resolve: {
    extensions: ['.webpack.js', '.js', '.jsx'],
    alias: {
      SRC: path.resolve(__dirname, 'src/'),
      // ASSET: path.resolve(__dirname,'assets/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['react', ['env', {
            targets: {
              browsers: ['> 1%']
            }
          }]],
          plugins: [
            "transform-es2015-destructuring",
            "transform-es2015-parameters",
            "transform-object-rest-spread",
          ],
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
    }
    ]
  },
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].js'
  },
  devtool: "source-map",
};
