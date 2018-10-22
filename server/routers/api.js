const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

// 验证方法，koa提供了一个全局验证的方式
const validateUser = async(ctx, next) => {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = 'need Login'
  } else {
    await next()
  }
}

// 直接在这里加session控制，就可以适用于/api路径下的所有请求，也可以在请求方法的第二个参数里面添加控制
apiRouter.use(validateUser)

// 成功返回的封装
const successResponse = data => {
  return {
    success: true,
    data
  }
}

// 此处调用存储在上下文中的db，和真正请求做解耦
apiRouter
  .get('/todos', async ctx => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  .post('/todo', async ctx => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  .put('/todo/:id', async ctx => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  .delete('/todo/:id', async ctx => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  .post('/delete/completed', async ctx => {
    if (ctx.request.body.ids.length > 0) {
      const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
      ctx.body = successResponse(data)
    } else {
      ctx.body = { info: 'There is no completed items.' }
    }
  })

module.exports = apiRouter
