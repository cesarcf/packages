const { error, space } = require("./console-logs");

const exit = (status = 0) => process.exit(status);

const die = ({ message, error: err, status = 1 } = {}) => {
  if (message) {
    error(`Fatal error: ${message}`);
  }

  if (err) {
    error(`Script ended by an error: ${err}`);
  }

  if (message || err) {
    space();
  }

  exit(status);
};

module.exports = {
  die,
  exit,
};
