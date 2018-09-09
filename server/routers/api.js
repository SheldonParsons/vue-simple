const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

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

const successResponse = data => {
  return {
    success: true,
    data
  }
}

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
    console.log(ctx.request.body)
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
