const modeUtils = require("./mode-utils");
const { inProject } = require("@cesarcf/paths");

module.exports = () => {
  const { mode, isDev } = modeUtils();
  const { findFile, requireFile, projectPath } = inProject();
  const helpers = { ...modeUtils(), ...inProject() };

  return {
    mode,
    context: projectPath("src"),
    entry: {
      main: [findFile("<root>/src/main.js")],
    },

    output: {
      clean: true,
      path: projectPath("dist"),
      filename: "[name].[contenthash].js",
      assetModuleFilename: "assets/[name].[contenthash][ext][query]",
      publicPath: "",
    },

    resolve: {
      modules: requireFile("<webpack>/resolvers/modules.js")(helpers),
      alias: requireFile("<webpack>/resolvers/alias.js")(helpers),
      extensions: requireFile("<webpack>/resolvers/extensions.js"),
    },

    devtool: isDev ? "eval-source-map" : false,
    devServer: requireFile("<webpack>/devServer.js")(helpers),
    optimization: requireFile("<webpack>/optimization.js")(helpers),
    stats: requireFile("<webpack>/stats.js"),

    module: {
      rules: [
        requireFile("<webpack>/loaders/javascript.js")(helpers),
        requireFile("<webpack>/loaders/scss.js")(helpers),
        requireFile("<webpack>/loaders/svg.js"),
        requireFile("<webpack>/loaders/assets.js"),
      ].filter(Boolean),
    },
    plugins: [
      requireFile("<webpack>/plugins/MiniCssExtractPlugin.js")(),
      requireFile("<webpack>/plugins/HtmlWebpackPlugin.js")(helpers),
      requireFile("<webpack>/plugins/CompressionPlugin.js")(helpers),
      requireFile("<webpack>/plugins/DefinePlugin.js")(helpers),
      requireFile("<webpack>/plugins/BundleAnalyzerPlugin.js")(),
    ].filter(Boolean),
  };
};
