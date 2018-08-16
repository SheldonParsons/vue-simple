import createApp from './create-app'

export default context => {
  // 里面会做很多异步的操作，所以需要用Promise来告诉vue-server-renderer告诉这个操作什么时候结束了
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // 我们只有主动给路由推一条记录，才会去执行这一部分代码，去匹配调用的组件
    router.push(context.url)

    // 在一个路由记录被推进去之后，所有异步的操作（异步加载组件之类的操作）都做完以后才会做做下面的操作
    router.onReady(() => {
      // 在路由准备好以后，把url和组件进行匹配
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component matched'))
      }
      resolve(app)
    })
  })
}
