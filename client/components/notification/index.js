import Notification from './notification.vue'
import notify from './function'

// 让组件可以在全局被调用，app中Vue.use就是找到了组件文件夹中的index.js文件
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
