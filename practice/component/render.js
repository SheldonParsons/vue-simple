import Vue from 'vue'

const component = {
  props: ['props1'],
  name: 'fatherComponent',
  render(createElement) {
    return createElement('div', {
      style: this.style,
      on: {
        click: () => { this.$emit('click') }
      }
    }, [
      this.$slots.header,
      this.props1
    ])
  },
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'sheldon'
    }
  }
}

new Vue({
  name: 'grandfatherComponent',
  components: {
    CompOne: component
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  mounted() {
    console.log(this.$refs.comp)
    console.log(this.$refs.comp.value)
    console.log(this.$refs.span)
  },
  methods: {
    handleClick() {
      console.log('Click...')
    }
  },
  // 使用render function来创建template一致的内容
  render(createElement) {
    return createElement('comp-one', {
      ref: 'comp',
      props: {
        props1: this.value
      },
      on: {
        click: this.handleClick
      },
      nativeOn: {
        click: this.handleClick
      }
    }, [
      createElement('span', {
        ref: 'span',
        slot: 'header',
        domProps: {
          innerHTML: '<span>456</span>'
        },
        attrs: {
          id: 'test-id'
        }
      }, this.value)
    ])
  }
})
