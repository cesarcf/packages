const CompressionPlugin = require("compression-webpack-plugin");

module.exports = ({ ifProd }) =>
  ifProd(
    new CompressionPlugin({
      test: /\.(js|css|html|ttf|svg|eot)$/,
      filename: "[path][base].gz",
      algorithm: "gzip",
      threshold: 0,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
  );
