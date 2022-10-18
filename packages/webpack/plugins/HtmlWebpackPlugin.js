const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ findFile }) =>
  new HtmlWebpackPlugin({
    title: "ReactApp",
    template: findFile("<root>/config/index.html.ejs", "<webpack>/index.html.ejs"),
    filename: "index.html",
    publicPath: "/",
    inject: false,
    hash: true,
  });
