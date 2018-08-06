import Vue from 'vue'

// 千万不要再computed和watch里面去修改所依赖的值
// 尽量只做到生成一个值，否则很可能会导致死循环
new Vue({
  el: '#root',
  template: `
  <div>
    <span>Name:{{' '+firstName + ' '+ lastName}}</span></br>
    <span>Name:{{name}}</span></br>
    <span>Name:{{getName()}}</span></br>
    <span>Number:{{number}}</span>
    <p>FullName: {{fullName}}</p>
    <p><input text="text" v-model="number"/></p>
    <p>FirstName: <input text="text" v-model="firstName"/></p>
    <p>LastName: <input text="text" v-model="lastName"/></p>
  </div>
  `,
  data: {
    firstName: 'Sheldon',
    lastName: 'Parsons',
    number: 0,
    fullName: ''
  },
  // computed是一个对象，在这个对象里面你可以去声明很多的方法
  // 这些方法返回的数据，可以通过调用变量一样在模板里面调用
  // 在Vue对象里面也可以用过方法名字来调用变量
  // computed其实就是一个定义class时候的get方法，可以用过变量名字去调用，但是其实调用的是这个方法
  // Vue其实对computed是有缓存的，这个对性能的意义是很大的
  // 只有在依赖的两个值有所变化的时候computed才会去计算
  // 一般用在一些数据需要通过一些处理后显示的时候
  computed: {
    name() {
      console.log('new Name')
      return ` ${this.firstName} ${this.lastName}`
    }
  },
  // 最初绑定的时候watch方法是不会执行的
  // 所以watch不是展示数据的好方式，应该是在监听到某个数据改变了以后需要watch这个数据变化的时候
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName
    }
  },
  methods: {
    getName() {
      console.log('getName invoked')
      return ` ${this.firstName} ${this.lastName}`
    }
  }
})
