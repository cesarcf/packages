const babelJestMd = require("babel-jest");
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;
const webpackAlias = require("@cesarcf/webpack/resolvers/alias");
const webpackExtensions = require("@cesarcf/webpack/resolvers/extensions");
const webpackModules = require("@cesarcf/webpack/resolvers/modules");
const { inProject } = require("@cesarcf/paths");

const { requireFile, projectPath } = inProject();
const babelConfig = requireFile("<root>/config/babel.config.js", "<babel>/babel.config.js");

module.exports = babelJest.createTransformer({
  ...babelConfig,
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: webpackModules({ projectPath }),
        extensions: webpackExtensions,
        alias: { ...webpackAlias({ projectPath }) },
      },
    ],
    ...babelConfig.plugins,
  ],
});
