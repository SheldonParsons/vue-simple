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

// 中间件，记录请求，和抓取错误信息，ctx上下文
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

app.use(async(ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async(ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
// koa-router的既定用法
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
