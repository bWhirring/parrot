const merge = require("webpack-merge");
const WebpackCommon = require("./common");

const dev = merge.smart({}, WebpackCommon, {
  mode: "development",
  devtool: "cheap-module-eval-source-map"
});

module.exports = dev;
