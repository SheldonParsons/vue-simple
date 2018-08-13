import Vue from 'vue'

// Vue组件中的一些高级属性，比较频繁使用
// 插槽：需要在组件“标签”内插入HTML标签时，需要在组件内声明一个<slot></slot>位置，来确定插入的具体位置
// 具名插槽：如果需要传入多个位置的标签，并且指定在不同的插槽内，就需要使用到具名插槽的，其实就是指定name，在组件中插入的元素需要指定slot值，其值就是slot的name
// 作用域插槽：在组件外部可以用过给元素指定slot-scope="props"属性，来通过props.value来调用组件内部插槽中的值

const ChildComponent = {
  template: `
    <div>This is ChildComponent: {{data.value}}</div>
  `,
  // 默认这里是不提供reactive的，也就是说这里的引用如果组件中改变了，这里也不会改变
  // 但是有方法能够做到，那就是自己提供get方法
  inject: ['yeye', 'data'],
  mounted() {
    console.log(this.$parent.$options.name)
    console.log(this.$parent.$parent.$options.name)
    // 可以通过这种定义inject的方式获取到父级或以上组件对象
    console.log(this.yeye, this.data.value)
  }
}

const component = {
  name: 'fatherComponent',
  components: {
    ChildComponent
  },
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="headers"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="bodys"></slot>
  //     </div>
  //   </div>
  // `,
  template: `
    <div :style="style">
      <slot :value="value" aaa="789"></slot>
      <child-component></child-component>
    </div>
  `,
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
  // 这个定义的provide可以在子组件及以下组件中通过inject属性来引用
  // 这里需要定义成function的形式，不然在初始化的时候会报错
  provide() {
    // 这种方式不推荐使用，但是defineProperty是很重要的~！！！！！！！
    const data = {}

    Object.defineProperty(data, 'value', {
      // 子组件中每次调用'value'都会拿到最新的this.value
      get: () => this.value,
      // 可以被读取
      enumerable: true
    })
    return {
      yeye: this,
      // 此处返回需要返回整个data
      data
      // value: this.value
    }
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  mounted() {
    // 我们可以通过这种方式拿到组件内部的值
    console.log(this.$refs.comp)
    console.log(this.$refs.comp.value)
    // 组件下面插入的元素仍然是一个元素
    console.log(this.$refs.span)
  },
  // template: `
  // <div>
  //   <comp-one>
  //     <span slot="headers">This is slot header spot.</span>
  //     <span slot="bodys">This is slot body spot.</span>
  //   </comp-one>
  // </div>
  // `
  template: `
  <div>
    <comp-one ref="comp">
      <span slot-scope="props" ref="span">{{props.value}}|{{props.aaa}}</span>
    </comp-one>
    <input type="text" v-model="value"/>
  </div>
  `
})
