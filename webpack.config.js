const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/services.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  watch: true,
};
