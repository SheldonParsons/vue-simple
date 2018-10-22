const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')
const serverRender = require('./server-render')
const path = require('path')
const fs = require('fs')

// 非开发环境下的ssr配置
// 非开发环境下，我们不需要发送请求去获取渲染后的文件了，因为已经在编译阶段渲染完成
// 我们只需要去静态文件中获取即可
const clientManifest = require('../../public/vue-ssr-client-manifest.json')
// 我们将服务端和客户端的文件，构建成一个renderer，供模板读取
const renderer = VueServerRenderer.createBundleRenderer(
  path.join(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

// 通过fs读取模板文件
const template = fs.readFileSync(
  path.join(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

// 我们现在已经拥有了服务端文件、客户端文件、服务端的模板文件，将这些要素已经上下文对象，传入到serverRender中
pageRouter.get('*', async(ctx) => {
  await serverRender(ctx, renderer, template)
})

module.exports = pageRouter
