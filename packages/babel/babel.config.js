module.exports = {
  presets: [
    [
      // Configure the transpilation based on the target browsers
      "@babel/preset-env",
      {
        // Support latest two versions of each browser
        targets: {
          browsers: ["last 2 versions"],
        },
        // Polyfills will be added explicitely to the bundle. Babel will
        // select which basic polyfills (core-js and regenerator/runtime) will
        // be imported based on the target browsers.
        useBuiltIns: "entry",
        corejs: 3,

        // Do not transpile import syntax to let Webpack handle
        // the imports (and allow tree shaking).
        // Transpile only in test mode, required by Jest.
        modules: process.env.NODE_ENV === "test" ? "auto" : false,
      },
    ],
    // JSX and React support
    "@babel/react",
    // Typescript support
    "@babel/typescript",
  ],
  // Extra plugins to support non standard syntax
  plugins: [
    // Class properties (stage-3)
    "@babel/plugin-proposal-class-properties",
    // export * as x from (stage-4)
    "@babel/plugin-proposal-export-namespace-from",
  ],
  env: {
    production: {
      // Remove data-test-id properties from JSX in production
      plugins: [["babel-plugin-jsx-remove-data-test-id", { attributes: ["data-testid"] }]],
    },
  },
};
