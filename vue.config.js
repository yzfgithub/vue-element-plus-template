'use strict'
const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV !== 'development'
const defaultSettings = require('./src/settings.js')
const name = defaultSettings.title || 'vuebasicframe'
// 本地环境是否需要使用cdn
// const devNeedCdn = false;
function resolve(dir) {
  return path.join(__dirname, './', dir)
}
// 引入压缩插件
const TerserPlugin = require('terser-webpack-plugin')
// 按需使用，默认开启

// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 按需使用，默认使用
// 匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

// cdn链接
// const cdn = {
//   // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
//   externals: {
//     vue: "Vue",
//     vuex: "Vuex",
//     axios: "axios",
//     // 'element-ui': 'element-ui',
//     // 'vue-router': 'VueRouter',
//     Vant: "Vant",
//     nprogress: "NProgress",
//     "weixin-js-sdk": "weixin-js-sdk",
//   },
//   // cdn的css链接
//   css: [
//     "https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.css",
//     "https://cdn.bootcdn.net/ajax/libs/vant/2.12.7/index.css",
//   ],
//   // cdn的js链接
//   js: [
//     "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.js",
//     "https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.js",
//     // 'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.min.js',
//     // 'https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.js',
//     "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.js",
//     "https://cdn.bootcdn.net/ajax/libs/vant/2.12.7/vant.js",
//     "https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.js",
//     "https://res2.wx.qq.com/open/js/jweixin-1.6.0.js",
//   ],
// };
module.exports = {
  publicPath: isProd ? '/gt-isc-user-group' : '/',
  lintOnSave: true,
  // outputDir: '../gt-isc-frame/dist/gt-isc-user-group',
  outputDir: 'dist/gt-isc-user-group',
  assetsDir: 'static',
  transpileDependencies: ['ant-design-vue'],
  //   configureWebpack: config => {
  //     config.entry.app = ["babel-polyfill", "./src/main.js"];
  // },
  configureWebpack: config => {
    const obj = {
      // 页面标题
      name: 'vuebasicframe',
      resolve: {
        alias: {
          '@': resolve('src')
        }
      },
      // 打包忽略配置
      // externals: cdn.externals,
      plugins: [
        // 如果有用到moment.js就需要用到这个忽略moment.js的语言包
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        // gzip压缩
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8,
          // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false
          // 删除原文件
        })
      ],
      output: {
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        // 把微应用打包成 umd 库格式
        jsonpFunction: `webpackJsonp_${name}`
      }
    }
    if (isProd) {
      // 公共代码抽离
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        },
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log']
                // 移除console
              }
            }
          })
        ]
      }
    }
    return obj
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // port: 8080,
    open: true,
    // 设置true为打开默认浏览器
    // host: "",
    compress: true,
    proxy: {
      '/appStore': {
        // target: 'http://10.1.71.72:8891',
        // 测试
        // target: 'http://10.152.160.27:60037',
        target: 'https://cloudtest.gt.cn',
        changeOrigin: true
      },
      '/vpnms': {
        target: 'http://cloudtest.gt.cn',
        changeOrigin: true
      }
    },
    disableHostCheck: true
  },
  // 是否开启sourcemap
  productionSourceMap: !isProd,
  css: {
    // 是否使用css分离插件 extracttextplugin
    extract: isProd,
    // 开启 css source maps?
    // sourcemap: false,
    // css预设器配置项
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: '@import "~@/styles/var.scss";',
      },
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            // 'ant-prefix': 'ug'
            "ant-prefix": "ug",
          },
          javascriptEnabled: true
        }
      }
    },
    // 启用 css modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  chainWebpack: config => {
    // 注入cdn
    config.plugin('html').tap(args => {
      //   // 生产环境或本地需要cdn时，才注入cdn
      //   if (isProd || devNeedCdn) {
      //     args[0].cdn = cdn;
      // }
      args[0].title = name
      return args
    })
    // config.when(isProd, (config) => {
    //   config.optimization.minimizer("terser").tap((args) => {
    //     // 注释console.*
    //     args[0].terserOptions.compress.drop_console = true;
    //     // remove debugger
    //     args[0].terserOptions.compress.drop_debugger = true;
    //     // 移除 console.log
    //     args[0].terserOptions.compress.pure_funcs = ["console.log"];
    //     // 去掉注释 如果需要看chunk-vendors公共部分插件，可以注释掉就可以看到注释了
    //     args[0].terserOptions.output = {
    //       comments: false,
    //     };
    //     return args;
    //   });
    // });
    // 暴露全局库名
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        _: 'lodash',
        $moment: 'moment',
        qs: 'qs'
      }
    ])
    // 将 svg 图标作为 Vue 组件导入
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    // 图片压缩
    config.module
      .rule('min-image')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        disable: !isProd
      })
      // 此处为ture的时候不会启用压缩处理,目的是为了开发模式下调试速度更快,网上错误示例直接写为disable:true,如果不去查看文档肯定是要被坑的
      .end()
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
  }
  // runtimeCompiler: true
}
