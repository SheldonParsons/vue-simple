import Vue from 'vue'

const component = {
  // 当我们需要改变双向绑定的值的时候，可以通过这种方式
  // 如果不使用model，那么props中就一定需要定义value来对应双向绑定
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
  methods: {
    changeValueInput(e) {
      this.value = e.target.value
    }
  },
  el: '#root',
  // v-model语法糖展开
  template: `
    <div>
      <comp-one v-model="value"></comp-one>
      <comp-one :value1="value" @change="value = arguments[0]"></comp-one>
      <input type="text" @input="changeValueInput($event)" />
      <div>{{value}}</div>
    </div>
  `
})
