const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = ({ ifProd }) => ({
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  minimize: true,
  minimizer: [ifProd(new TerserWebpackPlugin()), ifProd(new CssMinimizerPlugin())].filter(Boolean),
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      default: false,
      defaultVendors: false,
      // react chunk
      react: {
        test: /[\\/]node_modules[\\/](react.*|redux-*)[\\/]/,
        name: "react",
        chunks: "all",
        priority: 20,
        reuseExistingChunk: true,
      },
      // vendor chunk
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendor",
        chunks: "all",
        priority: 19,
        reuseExistingChunk: true,
      },
      // common chunk async
      async: {
        name: "async",
        minChunks: 2,
        chunks: "async",
        priority: 10,
        reuseExistingChunk: true,
      },
    },
  },
});
