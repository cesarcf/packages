const path = require("path");
const fs = require("fs");
const globber = require("fast-glob");
const { step, error, die, space } = require("@cesarcf/tools-cli");

const babelPath = path.dirname(require.resolve("@cesarcf/babel/package.json"));
const webpackPath = path.dirname(require.resolve("@cesarcf/webpack/package.json"));
const jestPath = path.dirname(require.resolve("@cesarcf/jest/package.json"));

const safePath = (unsafePath) =>
  unsafePath.startsWith("/") ? path.join(...[path.sep, ...unsafePath.split("/")]) : path.join(...unsafePath.split("/"));

const present = (targetPath) => fs.existsSync(targetPath);

const inProject = (basePath = process.cwd(), opts = {}) => {
  const rootPath = (p) => path.join(basePath, safePath(p));

  if (!opts.skipPackageCheck && !present(rootPath("package.json"))) {
    error("package.json not found. This command can only be used at the project's root");
    space();
    die();
  }

  const normalize = (o) =>
    o && typeof o === "object" && Object.getPrototypeOf(o) === Object.prototype ? o : { path: o };

  const defined = ({ path }) => path;

  const expandPath = (p) =>
    safePath(p)
      .replace("<root>", basePath)
      .replace("<babel>", babelPath)
      .replace("<webpack>", webpackPath)
      .replace("<jest>", jestPath);

  const fixPaths = ({ path, ...rest }) => ({
    path: expandPath(path),
    ...rest,
  });

  const available = ({ path, fail }) => {
    if (present(path)) {
      return true;
    }

    if (fail) {
      error(`Cannot find the given path: ${path}`);
      space();
      die();
    }

    return false;
  };

  // Get routes relative to the project's path
  const projectPath = (...p) => rootPath(path.join(...p));

  // Find some binary inside the node modules. Fatal error if not found
  const findBin = (binaryPath) => {
    try {
      // try to find the binary in the node_modules. First nested, then normal search. Altough
      // seem more performant to do first the "happy" path, it can cause errors like using the $HOME or
      // global binary instead of the nested one
      return globber.sync(`**/${binaryPath}`, { onlyFiles: true })[0] || require.resolve(binaryPath);
    } catch (e) {
      error(`Cannot find the ${binaryPath} binary. Maybe there are missing dependencies`);
      space();
      die();
      return undefined;
    }
  };

  const findFile = (...alternatives) => {
    const file = alternatives.map(normalize).filter(defined).map(fixPaths).find(available);

    if (file) {
      if (file.desc) {
        step(file.desc.replace("$file", path.relative(basePath, file.path)));
      }
      return file.path;
    }

    return undefined;
  };

  const requireFile = (...alternatives) => {
    const foundPath = findFile(...alternatives);
    if (foundPath) {
      return require(foundPath); // eslint-disable-line global-require
    }

    return undefined;
  };

  // Fix Windows paths to make globber happy
  const globberify = (p) => p.replace(/\\/g, "/");

  const glob = (...parts) => {
    const searchPath = expandPath(path.join(...parts.map(safePath)));
    return globber.sync(globberify(searchPath), { onlyFiles: false });
  };

  return {
    projectPath,
    findBin,
    findFile,
    requireFile,
    glob,
  };
};

module.exports = {
  safePath,
  inProject,
};
