const webpack = require("webpack");
const modeUtils = require("./mode-utils");
const webpackConfig = require("./webpack.config");
//Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack,
  modeUtils,
  webpackConfig,
  //Plugins
  MiniCssExtractPlugin,
  HtmlWebpackPlugin,
  CompressionPlugin,
  CssMinimizerPlugin,
  TerserWebpackPlugin,
  BundleAnalyzerPlugin,
};
