import Vue from 'vue'

const app = new Vue({
  el: '#root', // 挂载，只有创建的挂载点才会执行声明周期中的beforeMount、mounted
  template: '<div ref="divv" >this is cycle template.{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate() {
    console.log(this.$el, 'beforeCreate')
  },
  created() {
    console.log(this.$el, 'created')
  },
  beforeMount() { // 挂载之前
    console.log(this.$el, 'beforeMount')
  },
  mounted() { // 挂载之后
    console.log(this.$el, 'mounted')
  },
  beforeUpdate() { // 数据更新之前
    console.log(this, 'beforeUpdate')
  },
  updated() { // 数据更新后
    console.log(this, 'updated')
  },
  activated() { // 组件章节讲解
    console.log(this, 'activated')
  },
  deactivated() { // 组件章节讲解
    console.log(this, 'deactivated')
  },
  beforeDestroy() { // 销毁组件之前
    console.log(this, 'beforeDestroy')
  },
  destroyed() { // 销毁组件后
    console.log(this, 'destroyed')
  },
  render(h) {
    // 只有在本组件发生错误的时候才会被调用
    // throw new TypeError('render error')
    console.log('render function invoked.')
    return h('div', {}, this.text)
  },
  renderError(h, err) {
    // 用来帮助在开发阶段找到错误的
    return h('div', {}, err.stack)
  }
})

// setInterval(() => {
//   app.text = app.text += 1
// }, 1000)

setTimeout(() => {
  // 销毁组件对象，主动的解除所有的事件监听和watch
  app.$destroy()
}, 2000)
