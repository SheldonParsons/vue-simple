const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    // postcss是帮助我们后处理css的，编译完成后通过postcss优化代码，优化是通过一系列的组件去优化，autoprefixer就是其中之一
    autoprefixer()
  ]
}
