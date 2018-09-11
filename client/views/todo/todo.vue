<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in states" :key="tab"></tab>
      </tabs>
    </div>
    <input type="text" class="add-input" autofocus="autofocus" placeholder="接下来做什么？" @keyup.enter="handleAll">
    <Item :todo="todo" v-for="todo in filterTodos" :key="todo.id" @del="deleteTodo" @toggle="toggleTodostate(todo)"></Item>
    <Helper :filter="filter" :todos="todos" @clearAll='clearAllCompleted'></Helper>
    <!-- <router-view/> -->
  </section>
</template>


<script>
import {
  mapState, mapActions
} from 'vuex'
import Item from './item.vue'
import Helper from './helper.vue'

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  props: ['id'],
  mounted() {
    console.log(this.todos, this.todos.length)
    if (this.todos && this.todos.length < 1) {
      this.fetchTodos()
    }
  },
  // 在这里组件中增加的自定义option，可以在渲染的时候，通过Promise.all获取到这个方法
  asyncData({ store }) {
    // 通过登录验证才返回数据
    if (store.state.user) {
      return store.dispatch('fetchTodos')
    }
    return Promise.resolve()
  },
  data() {
    return {
      filter: '所有',
      states: ['所有', '未完成', '已完成']
    }
  },
  methods: {
    ...mapActions(['fetchTodos', 'addTodo', 'deleteTodo', 'updateTodo', 'deleteAllCompleted']),
    handleAll(e) {
      const content = e.target.value
      if (e.target.value.trim().length === 0) {
        this.$notify({
          content: '不允许输入空的内容'
        })
        return
      }
      const todo = {
        content,
        completed: false
      }
      this.addTodo(todo)
      e.target.value = ''
    },
    // deleteTodo(id) {
    //   this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    // },
    toggleTodostate(todo) {
      this.updateTodo({
        id: todo.id,
        todo: Object.assign({}, todo, {
          completed: !todo.completed
        })
      })
    },
    clearAllCompleted() {
      // this.todos = this.todos.filter(todo => !todo.completed)
      this.deleteAllCompleted()
    },
    handleChangeTab(value) {
      this.filter = value
    }
  },
  computed: {
    ...mapState(['todos']),
    filterTodos() {
      if (this.filter === '所有') {
        return this.todos
      }
      const completed = this.filter === '已完成'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Helper
  }
}
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

// 输入框的样式
.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.tab-container {
  background-color: #fff;
  padding: 0 15px;
}
</style>
