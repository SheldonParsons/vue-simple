import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 不使用hash方式
    mode: 'history',
    // 基础路由
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 保存滚动行为
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // 不是所有浏览器都支持history的方式，如果不这么做vue会自动使用hash的方式
    fallback: true
    // // 字符串转obj
    // parseQuery(query) {

    // },
    // // obj转字符串
    // stringifyQuery() {

    // }
  })
}
