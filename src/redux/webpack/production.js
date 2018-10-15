const path = require("path");
const merge = require("webpack-merge");
const ManifestPlugin = require("@dwd/webpack-mainfest");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackCommon = require("./common");

const {
  publicPath, filename, template, favicon,
} = require("../package.json").config;

const production = merge.smart({}, WebpackCommon, {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash].js",
    publicPath,
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      filename,
      template,
      favicon,
    }),
  ],
});

module.exports = production;
