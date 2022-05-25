const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = () => process.env.ANALYZE_BUNDLE && new BundleAnalyzerPlugin();
