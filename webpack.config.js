const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 将非js的代码单独打包成一个静态资源文件
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {//没有用到css，都是styl
      //     test: /\.css$/,
      //     use: [
      //         'style-loader',
      //         'css-loader'
      //     ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-timing.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({//
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlPlugin({template: './index.html'})// 自动创建一个html来容纳项目
  ]
}

if (isDev) {
  // 开发环境下的styl配置
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader', {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  // 帮助我们在页面上调试代码的工具，因为写的都是ES6的代码，浏览器上面都是编译后的代码，使用sourcemap来做代码的映射
  // source最完整的映射，但是效率比较低
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000, // 监听端口
    host: '0.0.0.0', // 局域网本机ip可访问
    overlay: {// 在webpack编译的过程中有任何的错误，都可以进行控制
      errors: true// 显示在网页上面
    },
    // historyFallback:{//将没有做映射的地址都映射到一个入口，index.html上面去

    // }
    // open: true//启动玩dev-server后自动打开浏览器，有点烦
    hot: true// 热加载，改了一个组件的代码，只重新渲染页面当前这个组件的效果，不会让整个页面重新加载
  }
  config.plugins.push(// 开启热加载需要添加这个插件
    new webpack.HotModuleReplacementPlugin(), // 启动hot功能的插件
    new webpack.NoEmitOnErrorsPlugin()// 帮助减少一些我们不需要信息展示的问题
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  // hash和chunkhash的区别就是，chunkhash是节点的hash
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  })
  // 指定输出静态文件的名字
  config.plugins.push(
    new ExtractPlugin('styls.[contentHash:8].css'),
    // vendor单独打包，vendor里面包含的就是我们的类库代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将生成在app.js里面webpack相关的代码再单独打包到一个文件里面
    // 这样的好处在于，我们有新的模块加入的时候，webpack会给新的模块加一个ID上去
    // 他插入的位置有可能是中间，这样会导致下面的hash发生变化，导致无法在浏览器上面做到长缓存的效果
    // 需要注意的是，vendor一定要放在runtime的前面
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
