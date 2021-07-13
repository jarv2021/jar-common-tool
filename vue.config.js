const path = require("path");

module.exports = {
  lintOnSave: true, //是否开启eslint
  // 自定义 webpack  配置
  chainWebpack: config => {
    // 自定义路径
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
    config.resolve.alias.set("@markdom", path.join(__dirname, "./markdom"));
    // 识别markdom文件
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true
      });
  },
  transpileDependencies: [/[/\\]node_modules[/\\]pdfjs-dist[/\\]/]
};
