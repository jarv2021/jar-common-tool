const path = require("path");

module.exports = {
  lintOnSave: false, //是否开启eslint
  // 自定义 webpack  配置
  chainWebpack: config => {
    // 自定义路径
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
  }
};
