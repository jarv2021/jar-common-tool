const path = require("path");

const pxtovw = require("postcss-px-to-viewport");

const CompressionWebpackPlugin = require("compression-webpack-plugin");

module.exports = {
  publicPath: "",
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
    loaderOptions: {
      postcss: {
        //给postcss-loader传递选项
        plugins: [
          new pxtovw({
            unitToConvert: "px", //需要转换的单位，默认为"px"；
            viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
            unitPrecision: 5, //单位转换后保留的小数位数
            propList: ["*"], //要进行转换的属性列表,*表示匹配所有,!表示不转换
            viewportUnit: "vw", //转换后的视口单位
            fontViewportUnit: "vw", //转换后字体使用的视口单位
            selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
            minPixelValue: 1, //设置最小的转换数值
            mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
            replace: true, //是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/] //忽略某些文件夹下的文件
          })
        ]
      }
    }
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
