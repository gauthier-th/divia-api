const path = require("path");
  
const config = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "divia-api.js",
    library: {
      name: "divia-api",
      type: "umd",
    },
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