module.exports = ({ requireFile }) => ({
  test: /\.[tj]sx?$/,
  exclude: (m) => /node_modules[\/\\]/.test(m),
  use: {
    loader: "babel-loader",
    options: {
      ...requireFile("<root>/config/babel.config.js", "<babel>/babel.config.js"),
    },
  },
});
