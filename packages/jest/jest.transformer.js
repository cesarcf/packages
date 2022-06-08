const { createTransformer } = require("babel-jest").default;
const webpackAlias = require("@cesarcf/webpack/resolvers/alias");
const webpackExtensions = require("@cesarcf/webpack/resolvers/extensions");
const webpackModules = require("@cesarcf/webpack/resolvers/modules");
const { inProject } = require("@cesarcf/paths");
const { requireFile, projectPath } = inProject();
const babelConfig = requireFile("<root>/config/babel.config.js", "<babel>/babel.config.js");

module.exports = createTransformer({
  ...babelConfig,
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: webpackModules({ projectPath }).filter((value) => value !== "node_modules"),
        extensions: webpackExtensions,
        alias: { ...webpackAlias({ projectPath }) },
      },
    ],
    ...babelConfig.plugins,
  ],
});
