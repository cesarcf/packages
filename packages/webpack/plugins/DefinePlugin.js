const fs = require("fs");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = ({ projectPath, mode }) => {
  const basePath = `${projectPath()}/.env`;
  const envPath = `${basePath}.${mode}`;

  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const env = dotenv.config({ override: true, path: finalPath }).parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return new webpack.DefinePlugin(envKeys);
};
