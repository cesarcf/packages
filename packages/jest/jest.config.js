const { inProject } = require("@cesarcf/paths");
const { findFile, requireFile, projectPath } = inProject();

module.exports = {
  // Enable DOM tests support
  testEnvironment: "jsdom",
  verbose: true,

  displayName: {
    name: "REACT-APP",
    color: "white",
  },

  // to locate test files and source files.
  roots: [projectPath()],

  // The root of the directory containing the package.json
  rootDir: projectPath(),

  // Base URL for the jsdom environment
  testURL: "http://localhost",

  // Test all files in the "test" folder either suffixed with "-test.js", "-test.jsx", or
  // having ".test.js", ".test.jsx" extensions
  testRegex: ".*[-.]test\\.[tj]sx?$",

  transform: {
    // Transform all js,jsx,ts,tsx files with Babel
    "\\.[tj]sx?$": findFile("<root>/config/jest.transformer.js", "<jest>/jest.transformer.js"),
  },

  // Code search paths
  // modulePaths: [paths.root],

  setupFiles: [
    // Configure environment variables for the test environment
    findFile("<root>/config/jest.env.js", "<jest>/jest.env.js"),

    // Load polyfills (TODO: es necesario añadirlo en el proyecto)
    // fromRoot("packages/polyfills"),
  ],

  setupFilesAfterEnv: [
    // Configure React testing library support
    findFile("<jest>/jest.rtl.js"),
  ],

  // Imported CSS/images mocks
  moduleNameMapper: {
    "\\.(css|scss)$": findFile("<jest>/jest.nullmapper.js"),
    "\\.icon\\.svg$": findFile("<jest>/jest.svgiconmapper.js"),
    "\\.(png|jpe?g|gif|svg)$": findFile("<jest>/jest.nullmapper.js"),
  },

  // Do not create coverage reports by default. Use the --coverage CLI option to override it
  collectCoverage: false,

  // Dump the coverage reports into the "coverage" folder
  coverageDirectory: "coverage",

  // Project's path which coverage will be reported
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],

  // Generate coverage reports in textm HTML, lcov and clover format
  coverageReporters: ["text", "html", "lcov", "clover"],

  // Añade la configuracion custom de babel a la compilacion del ts-jest
  // Jest runs the code in your project as JavaScript, por eso cuando usamos JSX o Typescript
  // tenemos que transformar ese codigo a Javascript y luego Jest hace su trabajo.
  globals: {
    //While babel-jest by default will transpile TypeScript files, Babel will not verify the types.
    //If you want that you can use ts-jest.
    "ts-jest": {
      babelConfig: findFile("<root>/config/babel.config.js", "<babel>/babel.config.js"),
    },
  },
};
