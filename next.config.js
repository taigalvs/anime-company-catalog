const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  modifyVars: {
    "@primary-color": "#1DA57A",
    "@link-color": "#1DA57A",
    "@border-radius-base": "2px",
  },

  lessVarsFilePath: "./styles/variables.less",

  lessVarsFilePathAppendToEndOfContent: false,

  cssLoaderOptions: {},

  webpack(config) {
    return config;
  },
});
