const path = require("path");
const merge = require("webpack-merge");
const ManifestPlugin = require("@dwd/webpack-mainfest");
const WebpackCommon = require("./common");
const { publicPath } = require("../package.json").config;

const production = merge.smart({}, WebpackCommon, {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.[hash].js",
    publicPath,
  },
  plugins: [new ManifestPlugin()],
});

module.exports = production;
