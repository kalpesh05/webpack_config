var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var PUBLIC = path.resolve(__dirname, "public");

var config = {
  entry: SRC_DIR + "/index.js",
  output: {
    path: path.join(DIST_DIR, "/app"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-2"]
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/", // where the fonts will go
              publicPath: "../" // override the default path
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC, "index.html"),
      filename: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "./src",
    hot: true
  }
};

module.exports = config;
