const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// SCSS loader
module.exports = ({ isDev }) => ({
  test: /\.scss$/,
  use: [
    {
      // CSS HotReloading in development
      loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader,
    },
    "css-loader",
    {
      loader: "sass-loader",
    },
  ],
});
