const pxToRem = require("postcss-pxtorem");

module.exports = {
  plugins: [
    pxToRem({propList: ["*"]}),
    require('cssnano')({preset: 'default'}),
  ],
};
