const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

// 身份信息的验证，这个动作其实是需要请求后台的，后续我们的后台验证就会在这里做
userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'sheldon' && user.password === 'testingpf') {
    // 设置session，使用中间件koa-session
    ctx.session.user = {
      username: 'sheldon'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'sheldon'
      }
    }
  } else {
    ctx.stauts = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
