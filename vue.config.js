const path = require("path");

module.exports = {
  lintOnSave: true, //是否开启eslint
  // 自定义 webpack  配置
  chainWebpack: config => {
    // 自定义路径
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
    config.resolve.alias.set("@markdom", path.join(__dirname, "./markdom"));
  },
  transpileDependencies: [/[/\\]node_modules[/\\]pdfjs-dist[/\\]/]
};
