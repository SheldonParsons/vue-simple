const Router = require('koa-router')
const send = require('koa-send')

// 只会去处理/public开头的文件
const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
