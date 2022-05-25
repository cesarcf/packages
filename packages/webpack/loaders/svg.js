//// SVGR. Import SVG files as React components
module.exports = {
  test: /\.icon\.svg$/,
  use: {
    loader: "@svgr/webpack",
    options: {
      icon: true,
    },
  },
};
