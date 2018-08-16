// 开始服务端渲染

// 我们需要ejs渲染我们的template
const ejs = require('ejs')

// ctx上下文，renderer开发和正式是不同的，所以我们要在外部传入，template也是一样
module.exports = async(ctx, renderer, template) => {
  // 指定上下文的Content-Type
  ctx.headers['Content-Type'] = 'text/html'

  const context = { url: ctx.path } // 用于服务端渲染时传到vue-server-renderer中去的

  try {
    // 首先用renderer将内容渲染出来
    const appString = await renderer.renderToString(context)
    // 将HTML渲染出来
    const html = ejs.render(template, {
      appString,
      // 拿到带有style标签的整个字符串，丢到HTML中
      style: context.renderStyles(),
      // js也是一样
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error', err)
    throw err
  }
}
