import Vue from 'vue'

const component = {
  // props是来定义这个组件被外部使用的时候，一些可变的行为的
  // 这个不单单可以用来判断，还可以检查传进来的值的类型是否正确
  // 命名还是推荐两个单词，但是不限制首字母为大写，传进来的时候还是使用prop-one的方式

  // 也可以使用这种方式，但是不够严谨
  // props: ['active','propOne','onChange'],
  props: {
    active: {
      // type: Boolean,
      // required: false,
      // 如果default需要返回一个对象，也需要像声明Vue实例的data一样返回一个default-function
      // default: false,
      // 这种方式来添加验证也可以，自定义的来验证props
      validator(value) {
        return typeof value === 'boolean'
      }
    },
    propOne: String,
    onChange: Function
  },
  template: `
  <div>
    <input type="text" v-model.number="text"/>
    <span v-show="active" @click="handleChange">See me if active</span>
    <span @click="handle2Change">See me 2Number</span>
    <div>{{propOne}}</div>
  </div>
  `,
  // 如果这个组件不是通过new来创建的，那么就需要通过function-return的方式来声明数据
  data() {
    // 此处return必须是一个新建的对象，不能使用一个全局的变量，这会导致各个组件相互影响
    return {
      text: 0
    }
  },
  methods: {
    handleChange() {
      this.onChange()
    },
    // 现在更加流行这种方式，而不是props function
    handle2Change() {
      this.$emit('change122')
    }
  }
}

// 第一种添加组件的方式，可以使用全局的Vue来添加
// 这样就定义了一个Comp的组件，我们在所有的地方使用Comp在template里面就代表使用了这个component
// 强烈推荐使用驼峰方式命名，在书写组件的时候使用小写-连接的方式，因为html没有两个单词的元素，不会存在冲突
// Vue.component('CompOne', component)

new Vue({
  components: {
    // 这种方式定义就是在该Vue实例下生效
    CompOne: component
  },
  data: {
    prop1: 'sheldon'
  },
  methods: {
    handleChange() {
      this.prop1 += 1
    }
  },
  el: '#root',
  template: `
  <div>
    <comp-one :active="111 === 111" :prop-one="prop1" :on-change="handleChange" @change122="handleChange"></comp-one>
    <comp-one :active="111 === 112"></comp-one>
  </div>
  `
})
