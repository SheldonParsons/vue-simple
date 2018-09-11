import createApp from './create-app'
import bus from './util/bus'

console.log('client-entry.js:客户端入口')
console.log('client-entry.js:创建客户端Vue对象，从create-app.js')
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  console.log('client-entry.js:将store对象写入html中')
  store.replaceState(window.__INITIAL_STATE__)
}

// 从一个全局的vue对象中接收事件，从而进行操作
bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  console.log('client-entry.js:将vue实例对象挂载到元素中')
  app.$mount('#root')
})
