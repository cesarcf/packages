module.exports = ({ projectPath, isDev }) => {
  if (isDev) {
    return {
      static: {
        directory: projectPath("dist"),
        publicPath: "",
        watch: false,
      },
      host: "0.0.0.0", //Docker - server to be accessible externally
      allowedHosts: "all", //Docker
      webSocketServer: "ws",
      port: 3000,
      https: false,
      open: false,
      hot: true, // apply HotModuleReplacementPlugin
      historyApiFallback: true,
      compress: false,
      // Show an overlay in the browser in case of build errors/warnings
      client: {
        overlay: {
          warnings: true,
          errors: true,
        },
      },
      headers: {},
      proxy: {},
    };
  }
};
