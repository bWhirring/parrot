const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "../src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: "dist/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: "babel-loader",
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "../node_modules"),
        loader: "style-loader!css-loader!less-loader?javascriptEnabled=true",
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, "../node_modules"),
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              // 如果没有options这个选项将会报错 No PostCSS Config found
              plugins: () => [
                require("autoprefixer")(), // CSS浏览器兼容
              ],
            },
          },
        ],
      },
    ],
  },
};
