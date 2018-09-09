import createApp from './create-app'
import bus from './util/bus'

const { app, router } = createApp()

// 从一个全局的vue对象中接收事件，从而进行操作
bus.$on('auth', () => {
  router.push('/login')
})

router.onReady(() => {
  app.$mount('#root')
})
