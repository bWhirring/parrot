const merge = require("webpack-merge");
const WebpackCommon = require("./common");

const dev = merge.smart({}, WebpackCommon, {
  mode: "development",
  devtool: "eval-source-map",
});

module.exports = dev;
