// 服务端
const Koa = require('koa')
const pageRouter = require('./routers/dev-ssr')
const app = new Koa()

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

// koa-router的既定用法
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
