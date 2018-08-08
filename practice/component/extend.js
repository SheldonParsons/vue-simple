import Vue from 'vue'

// 组件的继承

const component = {
  props: {
    active: Boolean,
    propOne: String,
    onChange: Function
  },
  template: `
  <div>
    <input type="text" v-model.number="text"/>
    <span v-show="active" @click="handleChange">See me if active</span>
    <span >See me 2Number</span>
    <div>{{propOne}}</div>
  </div>
  `,
  data() {
    return {
      text: 0
    }
  },
  mounted() {
    console.log('comp mounted')
  },
  methods: {
    handleChange() {
      this.onChange()
    }
  }
}

const parent = new Vue({
  name: 'parent'
})

const component2 = {
  // 只有通过new 一个Vue实例才能够去指定父组件，这样指定的方式是无效的
  // 而且非常不建议通过这个方式去修改parent里面的东西
  parent: parent,
  extends: component,
  data() {
    return {
      text: 1
    }
  },
  mounted() {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name)
    // 可以在子组件中通过this.$parent调用父组件
    this.$parent.text = 66666
  }
}

// 这样创建的Vue是Vue的子类
// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   // 可以通过propsData来像父类传递值
//   propsData: {
//     propOne: 'xxx'
//   },
//   // data是可以直接覆盖data的默认值
//   data: {
//     text: 123
//   },
//   mounted() {
//     console.log('instance mounted')
//   }
// })

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  components: {
    Comp: component2
  },
  data: {
    text: 123456
  },
  mounted() {
    console.log('Vue mounted')
    console.log(this.$parent.$options.name)
  },
  template: `
    <div>
      <comp></comp>
      <span>{{text}}</span>
    </div>
  `
})
