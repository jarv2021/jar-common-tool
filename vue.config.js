const path = require("path");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  productionSourceMap: process.env.NODE_ENV !== "production",
  lintOnSave: true, //是否开启eslint
  // 自定义 webpack  配置
  chainWebpack: config => {
    // 自定义路径
    config.resolve.alias.set("@", path.join(__dirname, "./src"));
    config.resolve.alias.set("@markdom", path.join(__dirname, "./markdom"));

    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // only package third parties that are initially dependent
        },
        "pdf-dist": {
          name: "pdf-dist",
          priority: 20, // 优先级 20
          test: /[\\/]node_modules[\\/]_?pdf-dist(.*)/
        }
      }
    });

    // 使用全局scss
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // Provide path to the file with resources
          // 要公用的scss的路径
          resources: "./src/styles/mixin.scss"
        })
        .end();
    });

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
  transpileDependencies: [/[/\\]node_modules[/\\]pdfjs-dist[/\\]/],
  configureWebpack: config => {
    // 生产环境下生效
    if (process.env.NODE_ENV === "production") {
      // 配置删除 console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;

      // 配置 gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css$/,
          threshold: 4096 // 超过4kb压缩
        })
      );
    }
  }
};
