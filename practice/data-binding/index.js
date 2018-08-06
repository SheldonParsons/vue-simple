import Vue from 'vue'

new Vue({
  el: '#root',
  // Vue在模板中能够访问的1、绑定在this上的所有值，就是Vue 2、Vue自建的一个白名单，默认js的一些全局对象
  // Vue默认是会转义字符串的，如果要显示一些html代码只可以通过声明一个标签，在标签中通过v-html指令来显示html内容
  // 通过v-bind来绑定的属性才能是动态的，可以简写成“:”
  // v-on则是绑定事件的指令，缩略的写法：“@”
  // 以这种方式动态的赋予class：:class="{active: isActive}"，isActive为true时class值为active，否则为空
  // 还有一种数组的写法：:class="[isActive ? 'active': '']"
  // 还有一种合并的写法：:class="[{actice: isActive}}]"
  template: `<div>
  {{isActive ? 'active':'no active'}}
  {{arr.join('  ')}}
  {{Date.now()}}
  {{html}}
  <div v-bind:id='aaa' v-on:click='handleClick'>
    <p v-html='html'></p>
  </div>
  <div :class="{active: isActive}">445566</div>
  <div :class="[isActive ? 'active': '']">778899</div>
  <div :class="[{active: isActive}]">114477</div>
  <div :style="[styles,styles2]">225588</div>
  <p>{{getJoinedArr(arr)}}</p>
  </div>`,
  data: {
    isActive: true,
    arr: [1, 2, 3],
    html: '<span>112233</span>',
    aaa: 'mainId',
    // Vue会去计算，如果有相同的属性，会用后面的替代前面的
    styles: {
      color: 'red'
    },
    styles2: {
      color: 'black'
    }

  },
  methods: {
    handleClick() {
      console.log('click...')
    },
    // 这种方式和{{arr.join('  ')}}是一样的
    getJoinedArr(arr) {
      return arr.join('___')
    }
  }
})
