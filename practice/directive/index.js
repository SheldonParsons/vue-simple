import Vue from 'vue'

// v-show,原理就是在元素上面加上display
// v-if的区别是把整个节点都remove掉了，性能比改变样式差很多
// v-else、v-else-if、v-if配合使用，上级兄弟节点，不然会报错
// v-for
// v-model数据绑定，默认只能用在input元素上面
// v-model绑定checkbox可以做到切换联动
// v-model,绑定一列数据，并且显示在这一列数据其实是value值的时候，我们也可以通过v-model
// v-model.number修饰符可以把输入的问题转换为数字
// v-model.trim修饰符可以帮你去掉首尾空格
// v-model.lazy会将input事件改为change，input里面体现就是输入完以后，离开以后点击一下才会改变
// v-once就是只绑定一次，再次有数据新的变化不会再改变，一般用于在静态内容
new Vue({
  el: '#root',
  template: `
  <div>
    <div v-show="active">Text:{{text}}</div>
    <div v-once="active">Text:{{text}}</div>
    <div v-if="active">Text:{{text}}</div>
    <div v-else-if="text === 0">Text: else text</div>
    <div v-else="active">Text:{{text}}</div>
    <div v-html='html'></div>
    <input type="text" v-model="text "/>
    <input type="checkbox" v-model="active "/>
    <input type="text" v-model.number="text"/>
    <div>
      <input type="checkbox" :value="1" v-model="arr "/>
      <input type="checkbox" :value="2" v-model="arr "/>
      <input type="checkbox" :value="3" v-model="arr "/>
    </div>
    <div>
      <input type="radio" value="one" v-model="picked "/>
      <input type="radio" value="two" v-model="picked "/>
    </div>
    <ul>
      <li v-for="item in arr">{{item}}</li>
      <li v-for="(item, index) in arr" :key="item">{{item}}:{{index}}</li>
      <li v-for="(val, key, index) in obj">{{val}}:{{key}}:{{index}}</li>
    </ul>
  </div>
  `,
  data: {
    arr: [1, 2, 3],
    obj: {
      a: '123',
      b: '456',
      c: '789'
    },
    picked: '',
    text: 0,
    active: true,
    html: '<span>this is html</span>'
  }
})
