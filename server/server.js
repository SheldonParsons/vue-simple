// 服务端
const Koa = require('koa')
// koa处理静态资源
const send = require('koa-send')
const path = require('path')
const staticRouter = require('./routers/static')
const apiRouter = require('./routers/api')
const createDB = require('./db/db')
const config = require('../app.config')
const koaBody = require('koa-body')
const koaSession = require('koa-session')
const userRouter = require('./routers/user')

const db = createDB(config.db.appId, config.db.appKey)

const app = new Koa()

app.keys = ['vue ssr tech']
app.use(
  koaSession({
    key: 'v-ssr-id',
    maxAge: 2 * 60 * 60 * 1000
  }, app)
)

const isDev = process.env.NODE_ENV === 'development'

console.log('server.js:koa中间件初始化完成，开始进入第一个use函数')
// 中间件 koa，记录请求，和抓取错误信息，ctx上下文
// 前端的请求会从这里进入，下面的代码是验证koa服务是否已经完成
app.use(async(ctx, next) => {
  const isDev = process.env.NODE_ENV === 'development'
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

console.log('server.js:加载ctx.db...')
app.use(async(ctx, next) => {
  // 我们现在只是将预请求的api加入到ctx全局对象当中，在我们真正路由访问到的时候才会去调用特定的db，然后发起后端请求
  ctx.db = db
  await next()
})

// 因为使用了koa，所以这个图标文件我们也需要加入到路由当中，浏览器会主动的发起一个请求来寻找这个图标
console.log('server.js:加载favicon.ico')
app.use(async(ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

console.log('server.js:加载koa路由')
// 下面是一系列的路由
// 我们在编写好这些路由的逻辑以后，把这些路由主动的添加到koa中间件当中
// 只有添加以后，koa才会去监控这些路由
// 其实就是一个注册的过程，将多个get、post等请求
app.use(koaBody())
// 验证user身份的路由
app.use(userRouter.routes()).use(userRouter.allowedMethods())
// 静态文件的路由
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
// 逻辑路由，也就是真正的业务逻辑的路由
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  // 在开发环境下，如果我们使用no bundle的形式来打包渲染会出问题，所以我们依然使用bundle的形式来渲染
  pageRouter = require('./routers/dev-ssr')
  // pageRouter = require('./routers/dev-ssr-no-bundle')
} else {
  // pageRouter = require('./routers/ssr')
  pageRouter = require('./routers/ssr-no-bundle')
}
// koa-router的既定用法
// 服务端渲染成功后的路由
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

// koa监听的端口，也就是我们服务端渲染完成以后访问的地址
console.log('server.js:koa监听端口...')
app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
