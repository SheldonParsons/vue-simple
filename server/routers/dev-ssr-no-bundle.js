// 帮助我们去编译出我们的server bundle
const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// const MemoryFS = require('memory-fs') // 不把文件写到磁盘内，只写到内存里面，webpack编译读取文件在内存里面更加高效
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

// const NativeModule = require('module')
// const vm = require('vm')

// 这样传入一个webpack配置就可以生成一个打包后文件
console.log('dev-ssr.js:webpack打包server端代码')
const serverComplier = webpack(serverConfig)
// const mfs = new MemoryFS()
console.log('dev-ssr.js:指定webpack编译输出目录在memoryFS里面')
// serverComplier.outputFileSystem = mfs // 指定webpack编译输出目录在memoryFS里面

// 记录webpack每次打包新生成的文件
let bundle
// 每次我们在server文件夹下修改了文件，都会重新执行一个打包
console.log('dev-ssr.js:watch监听打包，修改代码后自动打包')
serverComplier.watch({}, (err, stats) => {
  // 抛出打包时遇到的错误
  if (err) throw err
  stats = stats.toJson()
  // 有些错误比如是eslint的错误，是不会抛出来的，但是会在stats里面出现
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))

  // webpack打包出来的文件输出的路径，这个在webpack.config.server已经定义了
  console.log('dev-ssr.js:server端打包出来的文件输出路径')
  const bundlePath = path.join(
    serverConfig.output.path,
    'server-entry.js'
  )
  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry.js').default
  // try {
  //   const m = { exports: {} }
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')

  //   // 在外部给bundleStr加一个function
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   // new了一段可执行的js
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   // 需要有一个上下文，上下文中会包含很多公共变量
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (err) {
  //   console.log('compile js error:', err)
  // }
  console.log('new bundle generated')
})
// 也是koa的中间件，处理服务端渲染返回来的信息
const handleSSR = async(ctx) => {
  // 先判断bundle存不存在，第一次打包有可能bundle还没有打包完成
  console.log('dev-ssr.js:开始处理服务端渲染返回的内容')
  if (!bundle) {
    ctx.body = 'just waiting...'
    return
  }
  // 有bundle以后，就开始服务端渲染的过程

  // 我们通过http请求的方式拿到客户端打包出来的js
  console.log('dev-ssr.js:通过http请求获取到客户端打包出来的内容')
  const clientManifestResp = await axios.get('http://127.0.0.1:8000/public/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResp.data

  // vue-server-renderer只是生成了body的内容，一个完整的HTML还需要header footer等内容
  // 所以我们需要一个html模板，这个使用了ejs来渲染我们的HTML模板
  // 生成模板以后我们需要fs把ejs读进来
  console.log('dev-ssr.js:读取到服务端渲染的模板')
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  // 第二步我们需要去声明一个renderer
  // 可以帮我们去生成一个我们可以直接去调用renderer的function
  console.log('dev-ssr.js:创建Renderer')
  const renderer = VueServerRenderer.createRenderer({
    // 只需要他帮我们把APPString渲染出来，不使用默认的template
    inject: false,
    // 通过http请求拿到的客户端js文件再传给renderer
    // 这样可以帮我自动生成一个带有script标签的一个js引用的字符串，我们可以把它直接填到ejs文件中
    clientManifest
  })

  console.log('dev-ssr.js:传参进入Renderer')
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
