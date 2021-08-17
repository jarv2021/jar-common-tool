const path = require("path");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  // //是否开启 productionSourceMap
  productionSourceMap: process.env.NODE_ENV !== "production",
  // //是否开启 eslint
  lintOnSave: true,
  // 使用transpileDependencies属性配置node_modules中指定哪些文件夹或文件需要编译.
  transpileDependencies: [/[/\\]node_modules[/\\]pdfjs-dist[/\\]/],
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
  },
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
        "pdfjs-dist": {
          name: "pdfjs-dist",
          priority: 20, // 优先级 20
          test: /[\\/]node_modules[\\/]_?pdfjs-dist(.*)/
        },
        vue: {
          name: "vue",
          priority: 30, // 优先级 20
          test: /[\\/]node_modules[\\/]_?vue(.*)/
        },
        cropperjs: {
          name: "cropperjs",
          priority: 21, // 优先级 20
          test: /[\\/]node_modules[\\/]_?cropperjs(.*)/
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
