const Router = require('koa-router')
const send = require('koa-send')

// 只会去处理/public开头的文件，也就是静态文件的请求
const staticRouter = new Router({ prefix: '/public' })

// 使用koa的get、post方法去接收http请求并调用对应的函数
staticRouter.get('/*', async ctx => {
  // koa对静态文件创建的一个流的封装
  console.log('static.js:' + ctx.path)
  await send(ctx, ctx.path)
})

module.exports = staticRouter
