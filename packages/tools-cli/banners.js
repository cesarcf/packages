const { colors, log, space } = require("./console-logs");
const version = require("./package.json").version;

const banner = () => {
  const b = (x) => log(colors.banner(x));
  b(` `);
  b(`FRAMEWORK WEB ${colors.version(version)}`);
  b(` `);
};

const commandBanner = (command) => {
  log(colors.command(`-- ${command} --`));
  space();
};

const badNodeBanner = (required, current) => {
  dangerBanner(`
    Warning: you are using an unsuported NodeJS version

    Current version: ${current}
    Supported version: ${required}

    Please use a supported NodeJS version
  `);
};

const alertBanner = (color) => (text) => {
  const w = (x) => log(color(x));
  const rawLines = text.split("\n").map((s) => s.trim().replace(">>", ""));
  const length = Math.max(...rawLines.map((l) => l.length));
  const lines = rawLines.map((l) => l.padEnd(length));

  w("");
  w(` ╭${"".padEnd(length + 4, "─")}╮`);
  lines.forEach((l) => w(` │  ${l}  │`));
  w(` ╰${"".padEnd(length + 4, "─")}╯`);
  w("");
};

const warningBanner = alertBanner(colors.warning);
const dangerBanner = alertBanner(colors.danger);

module.exports = {
  banner,
  commandBanner,
  dangerBanner,
  badNodeBanner,
  warningBanner,
};
