// 每次服务端都会渲染一次app，每次都会创建一个新的app
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// vue第三方组件
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'
// 定义全局的组件
import Notification from './components/notification'
import Tabs from './components/tabs'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  console.log('create-app.js:开始创建Vue()实例，server和client实例都从此产出')
  const router = createRouter()
  console.log('create-app.js:实例化Vue路由')
  const store = createStore()
  console.log('create-app.js:实例化Vuex.store')

  console.log('create-app.js:实例Vue')
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
