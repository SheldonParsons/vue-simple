import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 动态加载模块
store.registerModule('c', {
  state: {
    text: 3
  }
})

new Vue({
  router,
  store,
  el: '#root',
  render: (h) => h(App)
})
