// 开始服务端渲染

// 我们需要ejs渲染我们的template
const ejs = require('ejs')

// ctx上下文，renderer开发和正式是不同的，所以我们要在外部传入，template也是一样
module.exports = async(ctx, renderer, template, bundle) => {
  // 指定上下文的Content-Type
  console.log('server-render.js:指定请求headers属性Content-Type')
  ctx.headers['Content-Type'] = 'text/html'

  console.log('server-render.js:初始化context')
  console.log('server-render.js:ctx.path:' + ctx.path)
  const context = { url: ctx.path, user: ctx.session.user } // 用于服务端渲染时传到vue-server-renderer中去的
  console.log(context)

  try {
    // 不适用bundle的方式来进行渲染
    console.log('server-render.js:字符化context')
    const app = await bundle(context)
    console.log('server-render.js:context.router.currentRoute.fullPath:' + context.router.currentRoute.fullPath)
    console.log('server-render.js:ctx.path:' + ctx.path)

    if (context.router.currentRoute.fullPath !== ctx.path) {
      return ctx.redirect(context.router.currentRoute.fullPath)
    }

    const appString = await renderer.renderToString(app, context)

    const { title } = context.meta.inject()

    // 将HTML渲染出来
    console.log('server-render.js:从ejs模板中渲染出html')
    const html = ejs.render(template, {
      appString,
      // 拿到带有style标签的整个字符串，丢到HTML中
      style: context.renderStyles(),
      // js也是一样
      scripts: context.renderScripts(),
      title: title.text(),
      initialState: context.renderState()// 在renderToString渲染完成之后会将store放在renderState上面
    })
    console.log('server-render.js:将渲染出来的html指向koa的body，在页面中显示出来')
    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
