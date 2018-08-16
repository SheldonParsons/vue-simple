<template>
    <div id="app">
        <div class="cover"></div>
        <Header></Header>
        <router-link :to="{name: 'app'}">app</router-link>
        <router-link to="/login">login</router-link>
        <!-- <router-link to="/login/exact">login exact</router-link> -->
        <!-- <Todo></Todo> -->
        <transition name="fade">
          <router-view />
        </transition>
        <!-- <p>{{fullName}}{{counter}}</p>
        <p>{{textA}}{{textB}}{{textC}}</p>
        <p>{{textPlus}}</p> -->
        <Footer></Footer>
        <!-- <router-view name="a"/> -->
    </div>
</template>


<script>
// import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  mounted() {
    // console.log(this.$store)
    // let i = 1
    // setInterval(() => {
    //   this.updateCount({num: i++, num2: 2})
    // }, 1000)
    // this.updateCountAsync({num: 5, time: 2000})
    // // 添加了命名空间的mutations
    // this['a/updateText']('111111111')
    // this['a/add']()
    // this.testAction()
  },
  computed: {
    // 通过不同的模块调用
    // textA() {
    //   return this.$store.state.a.text
    // },
    // textB() {
    //   return this.$store.state.b.text
    // },
    // State和Getters的用法，以及Vuex提供的简单方式调用
    // fullName() {
    //   return this.$store.getters.fullName
    // }
    // ...mapGetters({
    //   'fullName': 'fullName',
    //   textPlus: 'a/textPlus'
    // }),
    // count() {
    //   return this.$store.state.count
    // }
    // ...mapState(['count'])
    // ...mapState({
    //   counter: 'count'
    // })
    // ...mapState({
    //   counter: (state) => state.count,
    //   textA: state => state.a.text,
    //   textC: state => state.c.text
    // })
  },
  methods: {
    // ...mapActions(['updateCountAsync', 'a/add', 'testAction']),
    // ...mapMutations(['updateCount', 'a/updateText'])
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
}

.cover {
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  background-color: #999
  opacity: 0.9
  z-index: -1
}
</style>
