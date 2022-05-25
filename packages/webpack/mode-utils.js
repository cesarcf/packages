module.exports = () => {
  const mode = process.env?.NODE_ENV || "development";
  const isDev = mode === "development";
  const ifDev = (then) => (isDev ? then : null);
  const ifProd = (then) => (!isDev ? then : null);

  return {
    mode,
    isDev,
    ifDev,
    ifProd,
  };
};
