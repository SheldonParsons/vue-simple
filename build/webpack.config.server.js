const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
// 将非js的代码单独打包成一个静态资源文件
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
// 服务端渲染包，有了这个我们打包出来的内容就是一个json文件，而不是一个js文件
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  target: 'node', // 定义打包出来的执行环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  devtool: '#source-map', // 代码调试，只能指引到出错程序的位置
  output: {
    // 这个是指定我们写的代码，export出去入口是怎么样的，一般在nodejs里面使用的模块是：moudle.exports =
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js', // 不需要缓存之类的功能，所以不需要hash
    path: path.join(__dirname, '../server-build') // 输出目录
  },
  externals: Object.keys(require('../package.json').dependencies), // 不要打包这部分文件
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styls.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 使用server bundle的时候才会去使用这个插件，生成bundle.json
    new VueServerPlugin()
  ]
})

config.resolve = {
  alias: {
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
