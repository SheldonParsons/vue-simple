import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="divv" >this is {{text}}‘s template.{{obj.ak}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {// 这种方式和app.$watch()是一样的
  //   text(newText, oldText) {
  //     // console.log(`${newText}:${oldText}`)
  //   }
  // }
})

// 这种方式和指定el属性是一样的
app.$mount('#root')

// app.text = 'jim parsons'

setInterval(() => {
  app.text += 1
  // app.obj.ak = app.text
  // app.$forceUpdate()
}, 2000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
// console.log(app.$root)// 这个是Vue对象
// console.log(app.$root === app)// true
// console.log(app.$children)// 获取子组件
// console.log(app.$slots)// 插槽
// console.log(app.$scopedSlots)
// console.log(app.$refs)// 返回template实例，可能是HTML实例，可能是组件实例
// console.log(app.$isServer)// 只有在服务端渲染的时候才做会这个判断

// Vue实例上面的一些方法

// 1、
// 监听某个值变化
// 产生变化的时候会将变化前后以参数的方式传给给function
// 这种方式和在Vue实例中以option的方式去调用是一样的
// 这种方式当使用路由的时候，页面跳转之后需要手动去注销，不然会出现内存溢出的问题
// 在Vue实例中option的方式Vue会自己去注销
// const unWatch = app.$watch('text', (newText, oldText) => {
//   console.log(`${newText}:${oldText}`)
// })
// 关于手动注销的方式(只需要调用unWatch()即可)：
// setInterval(() => {
//   unWatch()
// }, 4000)

// 2、事件监听，触发了某个事件以后
// app.$on('text', (a, b) => {
//   console.log(`text emited ${a} ${b}`)
//   console.log(a, b)
// })

// 只监听一次
app.$once('text', (a, b) => {
  console.log(`text emited ${a} ${b}`)
  console.log(a, b)
})

// 触发事件
setInterval(() => {
  // 触发事件的时候还可以传递参数
  app.$emit('text', 'hello', 'world')
}, 4000)

// $on 和 $emit都只能同时作用于一个Vue上面

// 3、强制组件重新去渲染一次
// 因为Vue是一个响应式的框架，如果我们data中的对象的值没有进行过声明
// 而直接进行赋值的话，它就是非响应式的，不会引发Vue的instance进行重新渲染的过程
// forceUpdate()就可以帮我们处理这种情况
// 但是不建议这么做，除非万不得已，因为会强制整个组件去渲染，如果频率没有控制好，会影响应用的性能
// app.$forceUpdate()

// 还有一种方式
// 给obj对象的a属性赋值abc
// app.$set(app.obj, 'a', 'abc')
// 对应的，有一个删除的方法，这种方法会彻底的删掉这个属性
// app.$delete(app.obj, 'a')
