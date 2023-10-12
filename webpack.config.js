const path = require("path");
  
const config = {
  entry: "./src/index.js",
  target: "node",
  devtool: "source-map",
  node: { global: true },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "divia-api.js",
    library: {
      name: "DiviaAPI",
      type: "umd",
    },
    globalObject: `typeof self !== 'undefined' ? self : this`,
  },
  optimization: {
    minimize: false,
  },
};

const configMinimized = {
  ...config,
  output: {
    ...config.output,
    filename: "divia-api.min.js",
  },
  optimization: {
    minimize: true,
  },
};

module.exports = [config, configMinimized];