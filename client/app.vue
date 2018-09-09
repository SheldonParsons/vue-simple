<template>
    <div id="app">
        <div class="cover"></div>
        <div id="loading" v-show="loading">
          <Loading></Loading>
        </div>
        <Header></Header>
        <!-- <router-link :to="{name: 'app'}">app</router-link> -->
        <!-- <router-link to="/login">login</router-link> -->
        <!-- <router-link to="/login/exact">login exact</router-link> -->
        <!-- <Todo></Todo> -->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
        <!-- <button @click="notify">Click add notify</button> -->
        <!-- <notification content="test notifysss"/> -->
        <!-- <p>{{fullName}}{{counter}}</p>
        <p>{{textA}}{{textB}}{{textC}}</p>
        <p>{{textPlus}}</p> -->
        <Footer></Footer>
        <!-- <router-view name="a"/> -->
    </div>
</template>


<script>
import {mapState} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Loading from './components/loading/loading.vue'
// import Todo from './views/todo/todo.vue'

export default {
  // 每个组件中都可以定义这个meta，如果下级组件没有定义则使用上级的，定义了就使用下级的
  metaInfo: {
    title: 'Sheldon\'s Todo App'
  },
  components: {
    Header,
    Footer,
    Loading
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
    ...mapState(['loading'])
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
    notify() {
      this.$notify({
        content: 'sheldon test $notify',
        btn: 'close'
      })
    }
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
#loading{
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background-color rgba(255,255,255,.3)
  z-index 99
  display flex
  align-items center
  justify-content center
}
</style>
