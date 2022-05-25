const chalk = require("chalk");

const colors = {
  banner: chalk.bold.blue,
  version: chalk.gray,
  command: chalk.magenta,
  header: chalk.bold.blue,
  danger: chalk.bold.red,
  warning: chalk.yellow,
  success: chalk.green,
  step: chalk.blue,
  code: chalk.cyan,
  item: chalk.yellow,
};

const prefixes = {
  success: "\u2714", //✔
  warning: "\u26A0", //⚠
  error: "\u2716", //✖
  step: "\u21e8", //⇨
};

const withPrefix = (prefix) => (fn) => (message) => fn(`${prefix} ${message}`);
const write = (text = "") => console.log("  ", text); // eslint-disable-line no-console
const colorWrite = (color) => (message) => write(color(message));

const log = write;
const success = withPrefix(prefixes.success)(colorWrite(colors.success));
const warning = withPrefix(prefixes.warning)(colorWrite(colors.warning));
const error = withPrefix(prefixes.error)(colorWrite(colors.danger));
const header = colorWrite(colors.header);
const step = withPrefix(prefixes.step)(colorWrite(colors.step));

const space = (n = 1) => {
  while (n--) {
    write();
  }
};

const extendedFormat = (text) =>
  text
    .trim()
    .replace(/^#\s(.+)/gm, (_, rest) => `${colors.header(rest)}`)
    .replace(/^>(.*)/gm, (_, rest) => `    ${colors.code(rest)}`)
    .replace(/'(.+?)'/gm, (_, rest) => `${colors.code(rest)}`)
    .replace(/^\.\./gm, "  ")
    .replace(/-(.+?):(.+)/, (_, key, value) => `  ${colors.item(key)} ${value}`);

const info = (message) => message.split("\n").map(extendedFormat).forEach(log);

const infoList = (items, { label = "label", desc = "desc" } = {}) => {
  const labelWidth = Math.max(...items.map((l) => l[label].length));
  items.forEach((i) => log(`  ${colors.item(i[label].padEnd(labelWidth + 4))}${i[desc]}`));
};

module.exports = {
  colors,
  error,
  header,
  info,
  infoList,
  log,
  space,
  step,
  success,
  warning,
};
