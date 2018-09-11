import createApp from './create-app'

export default context => {
  // 里面会做很多异步的操作，所以需要用Promise来告诉vue-server-renderer告诉这个操作什么时候结束了
  console.log('server-entry.js:服务端入口')
  return new Promise((resolve, reject) => {
    console.log('server-entry.js:创建服务端Vue对象，从create-app.js')
    const { app, router, store } = createApp()

    console.log('server-entry.js:将context.user对象指向store，此处将会决定session状态')
    if (context.user) {
      store.state.user = context.user
    }

    console.log('server-entry.js:主动向服务端路由推送路由信息')
    // 我们只有主动给路由推一条记录，才会去执行这一部分代码，去匹配调用的组件
    router.push(context.url)

    // 在一个路由记录被推进去之后，所有异步的操作（异步加载组件之类的操作）都做完以后才会做做下面的操作
    console.log('server-entry.js:服务端路由onReady')
    router.onReady(() => {
      // 在路由准备好以后，把url和组件进行匹配
      console.log('server-entry.js:根据推送路由匹配该路由下的组件')
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      Promise.all(
        matchedComponents.map(component => {
          if (component.asyncData) {
            return component.asyncData({
              route: router.currentRoute,
              store
            })
          }
        })
      ).then(data => {
        context.meta = app.$meta()
        context.state = store.state
        resolve(app)
      })
    })
  })
}
