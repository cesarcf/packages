module.exports = ({ projectPath }) => ({
  root: projectPath(),
  config: projectPath("config"),
  src: projectPath("src"),
});
