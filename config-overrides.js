const { override, addLessLoader, adjustStyleLoaders } = require('customize-cra');

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[name]__[local]___[hash:base64:5]",
      },
      sourceMap: true
    }
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
)