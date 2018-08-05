// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    // 对template的空格被优化掉
    preserveWhitespace: true,
    // 将vue文件中的css代码也单独打包，不单独打包也可以，看需求，不单独打包vue会根据访问模块去单独的请求css
    extractCSS: !isDev,
    // 关闭热重载，这个vue会根据环境变量去生成
    // hotReload: false,
    // 自定义模块
    // loaders: {
    //     'docs': docsLoader
    // }
    // css的class名字生成一个独一无二的名字，在vue文件中需要将style的class引用改为module，而不是scoped
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
}
