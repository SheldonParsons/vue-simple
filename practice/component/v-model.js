import Vue from 'vue'

const component = {
  // 当我们需要改变双向绑定的值的时候，可以通过这种方式
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: {
    value: {
      type: String
    },
    value1: {
      type: String
    }
  },
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value1"/>
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  data() {
    return {
      value: '123',
      value2: '456'
    }
  },
  el: '#root',
  // 自己实现的v-model效果
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
      <comp-one :value1="value" @change="value = arguments[0]"></comp-one>
      <comp-one v-model="value2"></comp-one>
      <div>{{value}}</div>
    </div>
  `
})
