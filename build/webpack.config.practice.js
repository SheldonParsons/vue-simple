const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
// 将非js的代码单独打包成一个静态资源文件
const baseConfig = require('./webpack.config.base')

const defaultPlugins = [
  new webpack.DefinePlugin({//
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  })// 自动创建一个html来容纳项目
]

const devServer = {
  port: 8090, // 监听端口
  host: '0.0.0.0', // 局域网本机ip可访问
  overlay: {// 在webpack编译的过程中有任何的错误，都可以进行控制
    errors: true// 显示在网页上面
  },
  // historyFallback:{//将没有做映射的地址都映射到一个入口，index.上面去

  // }
  // open: true//启动玩dev-server后自动打开浏览器，有点烦
  hot: true// 热加载，改了一个组件的代码，只重新渲染页面当前这个组件的效果，不会让整个页面重新加载
}

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // 帮助我们在页面上调试代码的工具，因为写的都是ES6的代码，浏览器上面都是编译后的代码，使用sourcemap来做代码的映射
  // source最完整的映射，但是效率比较低
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[path]-[name]-[hash:base64:5]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // import Vue from 'vue'
  resolve: {
    alias: {
      // 修改默认使用的vue版本，vue.esm.js这个版本允许在index中添加template
      // 如果是runtime版本的vue是不允许添加template的
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(), // 启动hot功能的插件
    new webpack.NoEmitOnErrorsPlugin()// 帮助减少一些我们不需要信息展示的问题
  ])
})

module.exports = config
