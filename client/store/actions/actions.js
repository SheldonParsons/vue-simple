import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = err => {
  if (err.code === 401) {
    notify({
      content: '请您先登陆'
    })
    bus.$emit('auth')
  }
}

export default {
  // actions和mutations的区别就是actions是异步的，比如有数据请求的
  // updateCountAsync(store, data) {
  //   setTimeout(() => {
  //     store.commit('updateCount', { num: data.num, num2: 1 })
  //   }, data.time)
  // },
  fetchTodos({ commit }) {
    commit('startLoading')
    model
      .getAllTodos()
      .then(data => {
        commit('fillTodos', data)
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  addTodo({ commit }, todo) {
    commit('startLoading')
    model
      .createTodo(todo)
      .then(data => {
        commit('addTodo', data)
        commit('endLoading')
        notify({
          content: '你又多了一件事情要做'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  updateTodo({ commit }, { id, todo }) {
    commit('startLoading')
    model
      .updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', { id, todo: data })
        commit('endLoading')
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteTodo({ commit }, id) {
    commit('startLoading')
    model
      .deleteTodo(id)
      .then(() => {
        commit('deleteTodo', id)
        commit('endLoading')
        notify({
          content: '你又少了一件事情要做'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  deleteAllCompleted({ commit, state }) {
    commit('startLoading')
    const ids = state.todos.filter(todo => todo.completed).map(t => t.id)
    model
      .deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        commit('endLoading')
        notify({
          content: '清理的时候最舒畅！！！'
        })
      })
      .catch(err => {
        handleError(err)
        commit('endLoading')
      })
  },
  login({ commit }, { username, password }) {
    commit('startLoading')
    return new Promise((resolve, reject) => {
      model
        .login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登陆成功'
          })
          resolve()
          commit('endLoading')
        })
        .catch(err => {
          handleError(err)
          reject(err)
          commit('endLoading')
        })
    })
  }
}
